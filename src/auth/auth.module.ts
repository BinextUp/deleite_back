import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guads/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn:  configService.get<string>('JWT_EXPIRE') },
        global: true,
      }),
      inject: [ConfigService],
    }),
    /*
    JwtModule.register({
    global: true,
    secret: JwtConstants.jwtSecret,
    signOptions: { expiresIn: JwtConstants.jwtExpire },
  }),*/
],
  controllers: [AuthController],
  providers: [
    AuthService , 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports:[JwtModule]
})
export class AuthModule {}
