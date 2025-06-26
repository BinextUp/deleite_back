import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Rol } from '../../utils/enums/rol.enum';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@ApiBearerAuth()
@Auth(Rol.USER)

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post('create')
  async create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto, 
    @UserActive() user: UserActiveInterface
  ): Promise<any> {
    return this.purchaseOrderService.create(createPurchaseOrderDto, user);
  }

  @Get('all')
  async findAll(): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderService.findAll();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.purchaseOrderService.findOne(id);
  }
  @Get('searchByUserId')
  async findOneToken(@UserActive() userActive: UserActiveInterface):Promise<PurchaseOrder[]>{
    return this.purchaseOrderService.findOneToken(userActive);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(+id, updatePurchaseOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(+id);
  }
  @Get('api')
  async getApi(){
    console.log('Actualizando estados de las ordenes de compra');
    return this.purchaseOrderService.updateOrdersStatus();
  }

}
