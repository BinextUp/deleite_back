import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { hashPassword } from 'src/utils/hash/hash';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: number, user: User): Promise<User | null> {
        return this.userRepository.update(id , { ...user }).then(() => this.getUser(id));
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const userExists = await this.findByEmail(user.email);
        if (userExists) {
            throw new Error('Este Email ya existe');
        }
        user.password = await hashPassword(user.password);
        return this.userRepository.save(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        console.log(email);
        //const user = await this.userRepository.findOne({ where: { email:email }, });
        const user = this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne();
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
