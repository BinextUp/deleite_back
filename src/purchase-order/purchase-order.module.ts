import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './controllers/purchase-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [TypeOrmModule.forFeature([PurchaseOrder])]
})
export class PurchaseOrderModule {}
