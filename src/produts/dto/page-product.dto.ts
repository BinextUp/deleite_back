import { IsNumber} from "class-validator";

export class PageProductDto {
    @IsNumber()
    Page: number;
}   
