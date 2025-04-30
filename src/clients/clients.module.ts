import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client]), UsersModule,AuthModule],
  exports: [ClientsService]
})
export class ClientsModule {}
