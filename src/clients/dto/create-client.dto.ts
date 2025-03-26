import { IsInt, IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
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
    user_id: number;
    @IsOptional()
    user?: User;
}
