import { Module } from '@nestjs/common';
import { InvoicesService } from './services/invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoiceDetailModule } from '../invoice-detail/invoice-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), InvoiceDetailModule],
  controllers: [InvoicesController],
  providers: [InvoicesService]
})
export class InvoicesModule {}
