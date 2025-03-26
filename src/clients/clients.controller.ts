import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Rol } from '../utils/enums/rol.enum';
import { Client } from './entities/client.entity';

@Controller('clients')
@Auth(Rol.USER)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Get('all')
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client | null> {
    return this.clientsService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto): Promise<Client | null> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientsService.remove(id);
  }
}
