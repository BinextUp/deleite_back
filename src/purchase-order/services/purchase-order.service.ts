import { BadRequestException, Inject, Injectable,Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { AsyncLocalStorage } from 'async_hooks';
import { DataSource,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { ClientsService } from '../../clients/services/clients.service';
import { ApiProductService } from '../../utils/API/services/api-product.service';
import { TOKEN_TEMP } from '../../utils/token-temp/token-temp';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { DetailPurchaseService } from '../../detail-purchase/services/detail-purchase.service';



@Injectable()
export class PurchaseOrderService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    private readonly clientsService: ClientsService,
    private readonly apiProductService: ApiProductService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly dataSource: DataSource,
    private readonly detailPurchaseService: DetailPurchaseService,
  ) {}

  async numberOrderCorelative(): Promise<number> {
    const numOrder = await this.dataSource.query('SELECT nextval(\'number_order\')');
    return Number(numOrder[0].nextval);
  }
  
  async create(createPurchaseOrderDto: CreatePurchaseOrderDto, user: UserActiveInterface): Promise<any> {

    createPurchaseOrderDto.user_id = user.id;
    createPurchaseOrderDto.order_number = await this.numberOrderCorelative();

    const newOrder = await this.purchaseOrderRepository.save(createPurchaseOrderDto);
    if(!newOrder) {
      throw new BadRequestException('Error al crear la orden de compra de deleite');
    }
    const purchaseOrderWis = await this.CALL_API_WIS(createPurchaseOrderDto, user, newOrder.id);
   
    const updatePurchaseOrder = await this.updatePurchaseOrder(newOrder.id, purchaseOrderWis);
    await this.detailPurchases(createPurchaseOrderDto, newOrder.id);
    return updatePurchaseOrder;
  }

  async CALL_API_WIS(createPurchaseOrderDto: CreatePurchaseOrderDto, user: UserActiveInterface, id: number): Promise<any> {
    const newParams = await this.filterParams(createPurchaseOrderDto, user);
    const purchaseOrderWis = await this.apiProductService.createApiPurchaseOrder(this.searchToken(), newParams);
    
    if(!purchaseOrderWis) {
      await this.remove(id);
      throw new BadRequestException('Error al crear la orden de compra desde Wis');
    }
    return purchaseOrderWis;
  }

  async findAll(): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderRepository.find({
      relations: ['paymentMethod', 'user', 'detailPurchases']
    });
  }

  async findOne(id: number): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({ where: { id }, relations: ['paymentMethod', 'user','detailPurchases'] });
    if(!purchaseOrder) {
      throw new BadRequestException('Orden de compra no encontrada');
    }

    return purchaseOrder;
  }

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  async remove(id: number): Promise<void> {
    await this.purchaseOrderRepository.delete(id);
  }

   searchToken(): string {
      const token = TOKEN_TEMP.length > 0 ? TOKEN_TEMP[0].token : this.asyncLocalStorage.getStore().token;
      console.log(token);
      return token;
    }
   

  async filterParams(params: CreatePurchaseOrderDto, user: UserActiveInterface): Promise<any> {
    
    if(!user) {
      throw new BadRequestException('Usuario no autenticado');
    }
    const perfilUser = await this.clientsService.findOneByUserId(user.id);    
    const newParams = {
      companyStoreID: Number(process.env.COMPANY_STORE_ID),
      orderNumber: String(params.order_number), // obligatorio
      observation: `Orden ${params.order_number}`, // obligatorio
      subTotal: params.total,
      tax: params.tax,
      total: params.total,
      dateCreate: new Date(),
      statusWebID: 1,
      identityCard: perfilUser.cedula,
      typePerson:'v',
      Person:{
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        identityCard: perfilUser.cedula,
        identityTypeSymbol:'v',
        name: perfilUser.name,
        lastName: perfilUser.last_name,
        phoneMobile:perfilUser.phone,
        email:perfilUser.user.email
      },
      WEB_OrderProduct: params.detailPurchases.map((detail) => ({
        productID: detail.wis_product_id,
        quantity: detail.quantity,
        salesPrice: detail.price_unit,
        subTotal:detail.price_unit,
        total:detail.price_unit*detail.quantity,
        observation: `Observacion ${detail.wis_product_id}` // obligatorio
      }))
    };
    return newParams;
  }

  async updatePurchaseOrder( id: number, purchaseOrderWis: any): Promise<any> {
    await this.purchaseOrderRepository.findOne({ where: { id } });
    const updatePurchaseOrder = await this.purchaseOrderRepository.update(id, { wis_order_id: purchaseOrderWis.data.orderID }).then(() => this.findOne(id));
    if(!updatePurchaseOrder) {
      throw new BadRequestException('Error al actualizar la orden de compra de deleite');
    }
    console.log("Actualizado",updatePurchaseOrder);
    return updatePurchaseOrder;
  }

  async detailPurchases(createPurchaseOrderDto: CreatePurchaseOrderDto, purchaseOrderId: number): Promise<any>{

    const detail=createPurchaseOrderDto.detailPurchases.map((detail) => ({
      quantity: detail.quantity,
      price_unit: detail.price_unit,
      sub_total: detail.sub_total,
      purchase_order_id: purchaseOrderId,
      wis_product_id: detail.wis_product_id,
      wis_product_name: detail.wis_product_name
    }));
    return await this.detailPurchaseService.create(detail);
  }

  async getOrdersStatus(): Promise<PurchaseOrder[]> { 
    return await this.purchaseOrderRepository.find({
      select: [ 'id', 'order_number', 'wis_order_id', 'estado_id'],
      where: { estado_id: 1 }
    });
  }

  //@Cron('59 * * * * *')
  async updateOrdersStatus() {
    console.log('Actualizando estados de las ordenes de compra');
    const orders = await this.getOrdersStatus();
    if(orders.length === 0) {
      return;
    }
    for (const order of orders) {
      const params = this.paramsOrderStatus(order.wis_order_id, order.order_number);
      const orderStatus = await this.apiProductService.getApiPurchaseOrderStatus(this.searchToken(), params);
      
      if (orderStatus.data[0].weB_Status.statusWebID != 1) {

        await this.purchaseOrderRepository.update(order.id, { estado_id: Number(orderStatus.data[0].weB_Status.statusWebID) });
      }
        
    }
  }

  paramsOrderStatus(wisOrderId: number, order_number: number){
    return {
      CompanyStoreID: Number(process.env.COMPANY_STORE_ID),
      OrderID: wisOrderId,
      OrderNumber: order_number
    };
  }
  

}
