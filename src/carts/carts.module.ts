import { Module } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { CartsController } from './controllers/carts.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [TypeOrmModule.forFeature([Cart])],
  
})
export class CartsModule {}
