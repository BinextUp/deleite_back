import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { hashPassword } from 'src/utils/hash/hash';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        return user;
    }

    async updateUser(id: number, user: User): Promise<User> {
        await this.getUser(id);
        return await this.userRepository.update(id , { ...user }).then(() => this.getUser(id));
    }

    async createUser(user: CreateUserDto): Promise<User> {
        await this.findByEmail(user.email, false);
        user.password = await hashPassword(user.password);
        const newUser = await this.userRepository.save(user);
        if(!newUser) {
            throw new BadRequestException('Error al crear el usuario');
        }
        return newUser;
    }
    async findByEmail(email: string, login_create?: boolean): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        if(login_create && user) {
            return user;
        }
        if(login_create && !user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        if(!login_create && user) {
            throw new BadRequestException('Este Email ya existe');
        }
        return null;
       
    }

    async deleteUser(id: number): Promise<void> {
        await this.getUser(id);
        await this.userRepository.delete(id);
    }
}
