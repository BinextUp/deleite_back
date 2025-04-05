import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InvoiceDetailService } from '../services/invoice-detail.service';
import { CreateInvoiceDetailDto } from '../dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from '../dto/update-invoice-detail.dto';

@Controller('invoice-detail')
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Post('create')
  create(@Body() createInvoiceDetailDto: CreateInvoiceDetailDto) {
    return this.invoiceDetailService.create(createInvoiceDetailDto);
  }

  @Get('all')
  findAll() {
    return this.invoiceDetailService.findAll();
  }

  @Get('search/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceDetailService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    return this.invoiceDetailService.update(id, updateInvoiceDetailDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceDetailService.remove(+id);
  }
}
