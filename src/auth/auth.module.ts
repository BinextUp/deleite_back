import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guads/auth.guard';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
    global: true,
    secret: JwtConstants.jwtSecret,
    signOptions: { expiresIn: JwtConstants.jwtExpire },
  }),],
  controllers: [AuthController],
  providers: [
    AuthService , 
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, ],
})
export class AuthModule {}
