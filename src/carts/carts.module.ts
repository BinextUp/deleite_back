import { Module } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { CartsController } from './controllers/carts.controller';
import { Cart } from "../carts/entities/cart.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [TypeOrmModule.forFeature([Cart]),AuthModule],
  
})
export class CartsModule {}
