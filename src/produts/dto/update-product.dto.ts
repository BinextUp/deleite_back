import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber()
    @IsOptional()
    id: number;
    @IsString()
    @IsOptional()
    name: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsString()
    @IsOptional()
    image: string;
    @IsNumber()
    price: number;
    @IsNumber()
    stock: number;
    @IsNumber()
    category_id:number
    
}
