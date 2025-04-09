import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/hash/hash';
import { CreateAuthUserDto } from '../dto/create.auth.user.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email, true);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new NotAcceptableException('Credenciales incorrectas');
        }
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            token: await this.jwtService.signAsync(payload),
            user: user
        };
    }

    async createUser(user: CreateAuthUserDto): Promise<User> {
        const userExists = await this.usersService.findByEmail(user.email);
        if (userExists) {
            throw new NotAcceptableException('Este Email ya existe');
        }
        return this.usersService.createUser(user);
    }
}
