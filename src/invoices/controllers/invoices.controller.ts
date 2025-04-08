import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InvoicesService } from '../services/invoices.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { Invoice } from '../entities/invoice.entity';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('create')
  create(@Body() createInvoiceDto: CreateInvoiceDto, @UserActive() user: UserActiveInterface) {
    return this.invoicesService.create(createInvoiceDto, user);
  }

  @Get('all')
  async findAll(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.invoicesService.findOne(id);
  }

  @Patch('update/:id')
 update(@Param('id', ParseIntPipe) id: number, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
