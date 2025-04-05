import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CartsService } from '../services/carts.service';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { Cart } from '../entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  async create(@Body() createCartDto: CreateCartDto, @UserActive() user: UserActiveInterface): Promise<Cart> {
    return this.cartsService.create(createCartDto, user);
  }

  @Get()
  async findAllCartsActiveByUser(@UserActive() user: UserActiveInterface): Promise<Cart[]> {
    return this.cartsService.findAllCartsActiveByUser(user);
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return this.cartsService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCartDto: UpdateCartDto): Promise<Cart> {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.remove(id);
  }
}
