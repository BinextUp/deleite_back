import { IsInt, IsOptional, IsString } from "class-validator";
export class CreateClientDto {
    @IsString()
    name: string;
    @IsString()
    last_name: string;
    @IsString()
    cedula: string;
    @IsString()
    phone: string;
    @IsString()
    @IsOptional()
    address: string;
    @IsString()
    @IsOptional()
    web_site: string;
    @IsString()
    @IsOptional()
    rrss: string;
    @IsString()
    @IsOptional()
    image_profile: string;
    @IsInt()
    @IsOptional()
    user_id: number;
}
