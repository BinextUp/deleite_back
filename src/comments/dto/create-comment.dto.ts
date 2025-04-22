import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment: string;
    @IsNumber()
    wis_product_id: number;
    @IsNumber()
    user_id: number;
}
