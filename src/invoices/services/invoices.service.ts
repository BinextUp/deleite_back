import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceDetailService } from '../../invoice-detail/services/invoice-detail.service';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private readonly InvoiceRepository: Repository<Invoice>,
    private readonly InvoiceDetailService: InvoiceDetailService) {}
  
  async create(createInvoiceDto: CreateInvoiceDto, user: UserActiveInterface): Promise<Invoice> { 
    createInvoiceDto.user_id = user.id;
    const invoice = await this.InvoiceRepository.save(createInvoiceDto);
    if(!invoice) {
      throw new BadRequestException('No se pudo crear la factura');
    }
    
    const invoiceDetails = this.InvoiceDetailService.createMany(createInvoiceDto.details, invoice.id);
    if(!invoiceDetails) {
      await this.remove(invoice.id);
      throw new BadRequestException('No se pudo crear los detalles de la factura');
    }
    return invoice;
  }

  async findAll(): Promise<Invoice[]> {
    return this.InvoiceRepository.find({ relations: ['invoiceDetails'] });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.InvoiceRepository.findOne({ where: { id }, relations: ['invoiceDetails'] });
    if(!invoice) {
      throw new BadRequestException('Factura no encontrada');
    }
    return invoice;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.InvoiceDetailService.remove(id);
  }
}
