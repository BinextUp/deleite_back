import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString,IsEmail } from 'class-validator';
import { CreateUserDto } from './create.user.dto';
import { Rol } from "../../utils/enums/rol.enum";
import { Client } from "../../clients/entities/client.entity";
import { Cart } from "../../carts/entities/cart.entity";
import { Invoice } from "../../invoices/entities/invoice.entity";
import { PurchaseOrder } from '../../purchase-order/entities/purchase-order.entity';
import { Comment } from '../../comments/entities/comment.entity';
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
    comments: Comment[];
    @IsOptional()
    invoices: Invoice[];
    @IsOptional()
    purchaseOrders: PurchaseOrder[];
}

