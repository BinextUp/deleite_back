import { IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsString()
    image: string;
    @IsNumber()
    price: number;
    @IsNumber()
    stock: number;
    @IsOptional()
    category: Category;
}
