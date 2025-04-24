import { Body, Controller, Get, Param, ParseIntPipe, Patch} from '@nestjs/common';
import { DeparmentsService } from '../services/deparments.service';
import { Public } from '../../auth/decorators/public.decorator';
import { PageDeparmentDto } from '../dto/page-deparment.dto';

@Public()
@Controller('deparments')
export class DeparmentsController {
  constructor(private readonly deparmentsService: DeparmentsService) {}

  @Get('all')
  async findAll():Promise<any> {
    return await this.deparmentsService.apiGetAllDepartments();
  }

@Patch('search/:id')
 async findOne(@Param('id', ParseIntPipe) id: number, @Body() pageDeparmentDto: PageDeparmentDto):Promise<any> {
  if(pageDeparmentDto.Page ==0){
    pageDeparmentDto = {
      Page: 1
    };
  }  
  return await this.deparmentsService.apiGetOneDepartment(id, pageDeparmentDto);
  }

}
