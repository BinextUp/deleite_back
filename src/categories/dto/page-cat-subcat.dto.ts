import { IsNumber } from "class-validator";

export class PageCatSubCatDto {
    @IsNumber()
    Page: number;
}
