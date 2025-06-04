import {  IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
    @IsInt()
    cantidad: number;

    @IsDecimal({ force_decimal: true, decimal_digits: '2' }, { message: 'El precio debe ser un número decimal válido.' })
    precio: number;

    @IsInt()    
    product_id: number;

    @IsString()
    @IsOptional()
    title: string;
    
    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    user_id: number;

    @IsString()
    session_id: string;
}
