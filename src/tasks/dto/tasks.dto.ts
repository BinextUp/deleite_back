import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class TaskDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsOptional()
  edad: number;
}
