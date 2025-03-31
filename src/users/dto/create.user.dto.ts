import { IsString,IsEmail, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";
export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;
    @IsBoolean()
    termins: boolean;
   
}
