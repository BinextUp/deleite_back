import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './guads/auth.guard';

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
