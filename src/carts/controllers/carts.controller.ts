import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Session } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CartsService } from '../services/carts.service';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { Cart } from '../entities/cart.entity';
import { Public } from '../../auth/decorators/public.decorator';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Rol } from '../../utils/enums/rol.enum';


@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Public()
  @Post('create-session')
  async createSession(@Body() createCartDto: CreateCartDto, @Session() session: Record<string, any>): Promise<Cart> {
    return this.cartsService.createSession(createCartDto,session);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Post('create-token')
  async createToken(@Body() createCartDto: CreateCartDto, @UserActive() user: UserActiveInterface, @Session() session: Record<string, any>): Promise<any> {
    return this.cartsService.createToken(createCartDto, user,session);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('user-active')
  async findAllCartsActiveByUser(@UserActive() user: UserActiveInterface,@Session() session: Record<string, any>): Promise<Cart[]> {
    return this.cartsService.findAllCartsActiveByUser(user, session);
  }

  @Public()
  @Get('user-session')
  async findAllCartsActiveBySession(@Session() session: Record<string, any>): Promise<Cart[]> {
    return this.cartsService.findAllCartsActiveBySession(session);
  }


  @Get('all')
  async findAllCarts(): Promise<Cart[]> {
    return this.cartsService.findAllCarts();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return this.cartsService.findOne(id);
  }

  @Public()
  @Patch('update-product/:id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateCartDto: UpdateCartDto): Promise<Cart> {
    return this.cartsService.updateProduct(id, updateCartDto);
  }


  @Delete('delete-product/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.remove(id);
  }

  @Public()
  @Delete('delete-all-session')
  async removeAllSession(@Session() session: Record<string, any>) {
    return this.cartsService.removeAllSession(session);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Delete('delete-all-user')
  async removeAllUser(@UserActive() user: UserActiveInterface) {
    return this.cartsService.removeAllUser(user);
  }
}
