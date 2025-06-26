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
import { SessionCartDto } from '../dto/session-cart.dto';


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
  async createToken(@Body() createCartDto: CreateCartDto, @UserActive() user: UserActiveInterface): Promise<any> {
    return this.cartsService.createToken(createCartDto, user);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Post('create-session-token')
  async createSessionToken(@Body() sessionCartDto: SessionCartDto, @UserActive() user: UserActiveInterface): Promise<any> {
    return this.cartsService.createSessionToken(sessionCartDto, user);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('user-active')
  async findAllCartsActiveByUser(@UserActive() user: UserActiveInterface,@Session() session: Record<string, any>): Promise<Cart[]> {
    console.log('User activo',user)
    console.log(session)
    
    
    return this.cartsService.findAllCartsActiveByUser(user, session);
  }

  @Public()
  @Post('user-session')
  async findAllActiveBySession(@Body() sessionCartDto: SessionCartDto): Promise<Cart[]> {
    return this.cartsService.findAllActiveBySession(sessionCartDto);
  }

  @Public()
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

  @Public()
  @Delete('delete-product/:id')
  async remove(@Param('id', ParseIntPipe) id: number):Promise<any> {
    return this.cartsService.remove(id);
  }

  @Public()
  @Delete('delete-all-session')
  async removeAllSession(@Body() sessionCartDto: SessionCartDto) {
    return this.cartsService.removeAllSession(sessionCartDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Delete('delete-all-user')
  async removeAllUser(@UserActive() user: UserActiveInterface) {
    return this.cartsService.removeAllUser(user);
  }

  @Public()
  @Get('clear')
  async cleanerCart():Promise<Cart[]>{
    return this.cartsService.cleanerCart();
  }
}
