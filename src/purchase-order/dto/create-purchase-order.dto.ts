import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { DetailPurchase } from "../../detail-purchase/entities/detail-purchase.entity";

export class CreatePurchaseOrderDto {
    
    @IsNumber()
    total: number;

    @IsNumber()
    paymentMethod_id: number;

    @IsNumber()
    @IsOptional()
    tax: number; 

    @IsArray()
    @Type(() => DetailPurchase)
    detailPurchases: DetailPurchase[];

    @IsNumber()
    @IsOptional()
    user_id: number;

    @IsNumber()
    @IsOptional()
    order_number: number;

    @IsNumber()
    @IsOptional()
    iva: number;
}
