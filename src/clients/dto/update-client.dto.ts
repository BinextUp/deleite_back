import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsInt, IsString,IsOptional } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {

    @IsInt()
    id: number;
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
