import { IsBoolean, IsDate, IsInt } from "class-validator";

export class CreateCartDto {
    @IsBoolean()
    status:boolean;

    @IsInt()
    cantidad: number;

    @IsInt()
    precio: number;

    @IsDate()
    deletedAt: Date;

    @IsInt()    
    product_id: number;

    @IsInt()
    user_id: number;
}
