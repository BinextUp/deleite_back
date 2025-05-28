import { IsString } from "class-validator";

export class SessionCartDto {
    @IsString()
    session: string;
}
