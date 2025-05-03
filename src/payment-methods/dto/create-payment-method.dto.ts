import { Transform } from "class-transformer";
import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreatePaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({value})=> value.toLowerCase())
    @Transform(({value})=> value.trim())
    name: string;
    @IsString()
    @IsNotEmpty()
    @Transform(({value})=> value.trim())
    description: string;
    @IsString()
    @IsOptional()
    @Transform(({value})=> value.trim())
    icon: string;
}
