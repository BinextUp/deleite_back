import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetailService } from './services/invoice-detail.service';
import { InvoiceDetailController } from './controllers/invoice-detail.controller';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail])],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService],
  exports: [InvoiceDetailService]
})
export class InvoiceDetailModule {}
