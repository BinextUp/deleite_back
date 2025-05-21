import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client]), UsersModule,AuthModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: './uploads', // La ruta base para acceder a las imágenes (e.g., /uploads/nombre-del-archivo.jpg)
  }),
  ],
  exports: [ClientsService]
})
export class ClientsModule {}
