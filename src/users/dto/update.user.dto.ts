import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import { IsBoolean, IsInt, IsOptional, IsString,IsEmail } from 'class-validator';
import { Rol } from "../../utils/enums/rol.enum";
import { Client } from "../../clients/entities/client.entity";
import { Cart } from "../../carts/entities/cart.entity";
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsInt()
    @IsOptional()
    id: number;
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @IsOptional()  
    password: string;
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
    @IsBoolean()
    @IsOptional()
    termins: boolean;
    @IsString()
    @IsOptional()
    role: Rol;
    @IsOptional()
    client: Client;
    @IsOptional()
    carts: Cart[];
    @IsOptional()
    deletedAt: Date;
   

}

