import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User | null> {
        return this.usersService.getUser(id);
    }

    @Post('create')
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.createUser(user);
    }


    @Patch('update/:id')
    async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<User | null> {
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}
