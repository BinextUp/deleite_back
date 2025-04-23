import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './controllers/purchase-order.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { ClientsModule } from '../clients/clients.module';
import { LocalStorageMiddleware } from '../utils/local-storage/local-storage.middleware';
import { LocalStorageModule } from '../utils/local-storage/local-storage.module';
import { DetailPurchaseModule } from '../detail-purchase/detail-purchase.module';
import { ApiModule } from '../utils/API/api.module';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder]), 
    ScheduleModule.forRoot(),
    ClientsModule,
    ApiModule,
    LocalStorageModule,
    DetailPurchaseModule
  ]
})
export class PurchaseOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalStorageMiddleware)
      .forRoutes('*');
  }
}