import {  IsInt, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
    @IsInt()
    cantidad: number;

    @IsInt()
    precio: number;

    @IsInt()    
    product_id: number;

    @IsInt()
    @IsOptional()
    user_id: number;

    @IsString()
    @IsOptional()
    session_id: string;
}
