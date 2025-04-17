import { Injectable } from '@nestjs/common';
import { CreateDetailPurchaseDto } from '../dto/create-detail-purchase.dto';
import { UpdateDetailPurchaseDto } from '../dto/update-detail-purchase.dto';

@Injectable()
export class DetailPurchaseService {
  create(createDetailPurchaseDto: CreateDetailPurchaseDto) {
    return 'This action adds a new detailPurchase';
  }

  findAll() {
    return `This action returns all detailPurchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailPurchase`;
  }

  update(id: number, updateDetailPurchaseDto: UpdateDetailPurchaseDto) {
    return `This action updates a #${id} detailPurchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPurchase`;
  }
}
