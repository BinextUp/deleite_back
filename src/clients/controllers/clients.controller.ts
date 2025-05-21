import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Rol } from '../../utils/enums/rol.enum';
import { Client } from '../entities/client.entity';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { CreateImageUserDto } from '../dto/create-image-user.dto';
import { Public } from '../../auth/decorators/public.decorator';
import { confUploadImage } from '../../utils/database/config/conf-upload-image';


//@ApiBearerAuth()
@Controller('clients')
//@Auth(Rol.USER)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  async create(@Body() createClientDto: CreateClientDto, @UserActive() userActive: UserActiveInterface): Promise<Client> {
    return this.clientsService.create(createClientDto, userActive);
  }

  @Get('all')
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.findOne(id);
  }
  @Get('searchByUserId')
  async findOneByUserId(@UserActive() userActive: UserActiveInterface): Promise<Client> {
    return this.clientsService.findOneByUserId(userActive.id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto): Promise<Client | null> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientsService.remove(id);
  }

  @Public()
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', confUploadImage()))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.clientsService.uploadImage(file);
  }
}

