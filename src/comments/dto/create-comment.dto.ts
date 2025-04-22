import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment: string;
    @IsNumber()
    wis_product_id: number;
    @IsNumber()
    @IsOptional()
    user_id: number;
}
