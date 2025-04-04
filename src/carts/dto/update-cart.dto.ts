import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsBoolean, IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
        @IsNumber()
        @IsOptional()
        id: number;
        
        @IsBoolean()
        @IsOptional()
        status:boolean;
    
        @IsInt()
        @IsOptional()
        cantidad: number;
    
        @IsInt()
        @IsOptional()
        precio: number;
    
        @IsDate()
        @IsOptional()
        deletedAt: Date;
    
        @IsInt()    
        @IsOptional()
        product_id: number;
    
        @IsInt()
        @IsOptional()
        user_id: number;
}
