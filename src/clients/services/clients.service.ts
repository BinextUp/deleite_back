import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly usersService: UsersService,
  ) {}


  async create(createClientDto: CreateClientDto, userActive: UserActiveInterface): Promise<Client> {

    await this.usersService.getUser(userActive.id);
    createClientDto.user_id = userActive.id;
    const client = await this.clientRepository.save(createClientDto);
    if(!client) {
      throw new BadRequestException('Error al crear el cliente');
    }
    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id }});
    if(!client) {
      throw new BadRequestException('Perfil no encontrado');
    }
    return client;
  }

  async findOneByUserId(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { user_id: id }, relations: ['user'] });
    if(!client) {
      throw new BadRequestException('Este usuario no tiene un perfil');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.findOne(id);
    return this.clientRepository.update(id, updateClientDto).then(() => this.findOne(id));
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.clientRepository.delete(id);
  }
}
