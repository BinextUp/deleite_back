import { Type } from "class-transformer";
import { InvoiceDetail } from "../../invoice-detail/entities/invoice-detail.entity";
import { IsArray, IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateInvoiceDto {
    @IsDate()
    @IsOptional()
    fechaFactura: Date;
    @IsNumber()
    precioNeto: number;
    @IsNumber()
    iva: number;
    @IsNumber()
    @IsOptional()
    descuento: number;
    @IsNumber()
    paymentMethod_id: number;
    @IsArray()
    @Type(() => InvoiceDetail)
    @IsOptional()
    details: InvoiceDetail[];
    @IsNumber()
    @IsOptional()
    user_id: number;
}
