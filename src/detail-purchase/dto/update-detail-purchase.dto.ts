import { PartialType } from '@nestjs/swagger';
import { CreateDetailPurchaseDto } from './create-detail-purchase.dto';

export class UpdateDetailPurchaseDto extends PartialType(CreateDetailPurchaseDto) {}
