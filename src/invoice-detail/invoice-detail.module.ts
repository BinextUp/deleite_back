import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './services/invoice-detail.service';
import { InvoiceDetailController } from './controllers/invoice-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail])],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService]
})
export class InvoiceDetailModule {}
