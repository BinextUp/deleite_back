import {  IsBoolean, IsInt } from "class-validator";

export class StatusCartDto {
    @IsInt()
    id: number;

    @IsBoolean()    
    status: boolean;
}
