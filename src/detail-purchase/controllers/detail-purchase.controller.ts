import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailPurchaseService } from '../services/detail-purchase.service';
import { CreateDetailPurchaseDto } from '../dto/create-detail-purchase.dto';
import { UpdateDetailPurchaseDto } from '../dto/update-detail-purchase.dto';

@Controller('detail-purchase')
export class DetailPurchaseController {
  constructor(private readonly detailPurchaseService: DetailPurchaseService) {}

  @Post()
  create(@Body() createDetailPurchaseDto: CreateDetailPurchaseDto) {
    return this.detailPurchaseService.create(createDetailPurchaseDto);
  }

  @Get()
  findAll() {
    return this.detailPurchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailPurchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPurchaseDto: UpdateDetailPurchaseDto) {
    return this.detailPurchaseService.update(+id, updateDetailPurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPurchaseService.remove(+id);
  }
}
