import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDetailPurchaseDto {
    @IsNumber()
    wis_product_id: number;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price_unit: number;
    @IsNumber()
    sub_total: number;
    @IsNumber()
    purchase_order_id: number;
    @IsString()
    @IsOptional()
    wis_product_name: string;
}
