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
    @IsInt()
    @IsOptional()
    user_id: number;
}
