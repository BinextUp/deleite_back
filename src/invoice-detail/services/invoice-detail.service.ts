import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDetailDto } from '../dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from '../dto/update-invoice-detail.dto';
import { InvoiceDetail } from '../entities/invoice-detail.entity';


@Injectable()
export class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private readonly invoiceDetailRepository: Repository<InvoiceDetail>,
  ) {}

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto[]): Promise<InvoiceDetail[]> {
    const invoiceDetail = await this.invoiceDetailRepository.save(createInvoiceDetailDto);
    if(!invoiceDetail) {
      throw new BadRequestException('Problemas al crear el detalle de la factura');
    }
    return invoiceDetail;
  }

  async findAll(): Promise<InvoiceDetail[]> {
    return this.invoiceDetailRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceDetail`;
  }

  update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    return `This action updates a #${id} invoiceDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceDetail`;
  }

  async createMany(createInvoiceDetailDto: CreateInvoiceDetailDto[], invoiceId: number): Promise<InvoiceDetail[]> {
    const invoiceDetails = createInvoiceDetailDto.map((invoiceDetail) => {
      return {
        ...invoiceDetail,
        invoice_id: invoiceId,
        num_invoice: invoiceId+1
      };
    });
    const details = await this.create(invoiceDetails);
    return details;
  }
}
