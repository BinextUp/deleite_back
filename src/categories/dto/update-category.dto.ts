import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, IsString } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    
    @IsInt()
    id: number;
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsString()
    image: string;

}
