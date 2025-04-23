import { PartialType } from '@nestjs/swagger';
import { CreateDeparmentDto } from './create-deparment.dto';

export class UpdateDeparmentDto extends PartialType(CreateDeparmentDto) {}
