import { IsNumber } from "class-validator";

export class PageDeparmentDto {
    @IsNumber()
    Page:number;
}
