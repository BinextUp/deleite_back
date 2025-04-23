import { IsNumber } from "class-validator";

export class PageCategoryDto {
    @IsNumber()
    Page: number;
}
