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
import { paramsStatusOrder, paramsCreatePurchaseOrder } from '../../utils/api-params/api-params';


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
    await this.detailPurchases(createPurchaseOrderDto, newOrder.id);
    const updatePurchaseOrder = await this.updatePurchaseOrder(newOrder.id, purchaseOrderWis);
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

  async findOneToken(userActive: UserActiveInterface): Promise<PurchaseOrder[]> {
    const purchaseOrder = await this.purchaseOrderRepository.find({ where: { user_id:userActive.id }, relations: ['paymentMethod', 'user','detailPurchases','estatu'] });
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
   

  async filterParams(createPurchaseOrder: CreatePurchaseOrderDto, user: UserActiveInterface): Promise<any> {
    
    if(!user) {
      throw new BadRequestException('Usuario no autenticado');
    }
    const perfilUser = await this.clientsService.findOneByUserId(user.id);
    return  paramsCreatePurchaseOrder(createPurchaseOrder, perfilUser);
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
      select: [ 'id', 'order_number', 'wis_order_id', 'estatu_id'],
      where: { estatu_id: 1 }
    });
  }

  //@Cron('*/5 * * * *') 
  async updateOrdersStatus() {
    console.log('Actualizando estados de las ordenes de compra');
    const orders = await this.getOrdersStatus();
    if(orders.length === 0) {
      return;
    }
    for (const order of orders) {
      const orderStatus = await this.apiProductService.getApiPurchaseOrderStatus(
        this.searchToken(), paramsStatusOrder(order.wis_order_id, order.order_number));
        let estatu=0;

      switch(orderStatus.data[0].weB_Status.statusWebID){ // 1: pendiente, 2: En Preparacion, 3: Anulado, 4: Confirmado, 5: Completado, 7: Facturado, 8: Pendiente por Retirar
        case 1:
          estatu=1; // pendiente
          break;
        case 2:
          estatu=2; // en proceso
          break;
        case 3:
          estatu=6; // rechazado
          break;
        case 4:
          estatu=3; //aprobado
          break;
        case 5:
          estatu=3; //aprobado
          break;
        case 7:
          estatu=3; //aprobado
          break;
        case 8:
          estatu=8; //pendiente por retirar
          break;
      }
      await this.purchaseOrderRepository.update(order.id, { estatu_id: estatu });  
    }
  }

}
