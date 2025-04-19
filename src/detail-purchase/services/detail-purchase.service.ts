import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetailPurchaseDto } from '../dto/create-detail-purchase.dto';
import { UpdateDetailPurchaseDto } from '../dto/update-detail-purchase.dto';
import { DetailPurchase } from '../entities/detail-purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetailPurchaseService {
  constructor(
    @InjectRepository(DetailPurchase)
    private readonly detailPurchaseRepository: Repository<DetailPurchase>,
  ) {}
  async create(createDetailPurchaseDto: CreateDetailPurchaseDto[]): Promise<DetailPurchase[]> {
    const detailPurchases = await this.detailPurchaseRepository.save(createDetailPurchaseDto);
    if(!detailPurchases) {
      throw new BadRequestException('Error al crear el detalle de la orden de compra de deleite');
    }
    return detailPurchases;
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
