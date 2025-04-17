import { Module } from '@nestjs/common';
import { DetailPurchaseService } from './services/detail-purchase.service';
import { DetailPurchaseController } from './controllers/detail-purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPurchase } from './entities/detail-purchase.entity';

@Module({
  controllers: [DetailPurchaseController],
  providers: [DetailPurchaseService],
  imports: [TypeOrmModule.forFeature([DetailPurchase])]
})
export class DetailPurchaseModule {}
