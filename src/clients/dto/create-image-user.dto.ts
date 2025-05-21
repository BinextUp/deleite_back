import {  IsString } from "class-validator";

export class CreateImageUserDto {
    @IsString()
    image_profile: string;
  
}
