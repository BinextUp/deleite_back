import { Controller, Post, Body, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthUserDto } from '../dto/create.auth.user.dto';
import { Public } from '../decorators/public.decorator';
import { AuthUserDto } from '../dto/auth.user.dto';
import { Rol } from '../../utils/enums/rol.enum';
import { Auth } from '../decorators/auth.decorator';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async login(@Body() authUser:AuthUserDto): Promise<any> {
      return await this.authService.signIn(authUser.email, authUser.password);
    }
  
    @Auth(Rol.USER)
    @Get('profile')
    //TODO:estoy usando el decorador UserActive para obtener el usuario autenticado, Estos personalizado
    getProfile(@UserActive() user: UserActiveInterface) {
      return user;
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('register')
    async register(@Body() authUser: CreateAuthUserDto) {
        const user = await this.authService.createUser(authUser);
        return user;
    }
    
}
