import { IsString, IsEmail, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class CreateAuthUserDto {
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.trim())
    email: string;
    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;
    @IsBoolean()
    termins: boolean;

}
