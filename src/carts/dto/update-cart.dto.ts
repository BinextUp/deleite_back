import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsBoolean, IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
      
        @IsInt()
        @IsOptional()
        cantidad: number;
    
}
