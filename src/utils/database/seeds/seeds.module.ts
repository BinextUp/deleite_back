import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './services/seeds.service';
import { UsersModule } from '../../../users/users.module';
import { Estatu } from './estatu-app/estatu.entity';

@Module({
  providers: [SeedsService],
  imports:[TypeOrmModule.forFeature([Estatu]),UsersModule]
})
export class SeedsModule {}
