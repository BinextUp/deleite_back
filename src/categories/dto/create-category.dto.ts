import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    name: string;
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    description: string;
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.trim())
    image: string;
}
