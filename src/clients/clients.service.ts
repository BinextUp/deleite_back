import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly usersService: UsersService,
  ) {}


  async create(createClientDto: CreateClientDto): Promise<Client> {

    const user = await this.usersService.getUser(createClientDto.user_id);

    if (!user) {
      throw new Error('Este usuario no existe');
    }
  
    createClientDto.user = user;
   
    return this.clientRepository.save(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number): Promise<Client | null> {
    return this.clientRepository.findOne({ where: { id }});
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client | null> {
    return this.clientRepository.update(id, updateClientDto).then(() => this.findOne(id));
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
