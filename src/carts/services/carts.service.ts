import { BadRequestException, Injectable } from '@nestjs/common';
import { IsNull, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { Cart } from '../entities/cart.entity';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { SessionCartDto } from '../dto/session-cart.dto';


@Injectable()
export class CartsService {
  
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async createSession(createCartDto: CreateCartDto, session: Record<string, any>): Promise<Cart> {
    
    if(createCartDto.session_id==='012v3a4c5i6o789'){
      createCartDto.session_id = session.id;
    }
    const cart = await this.cartRepository.save(createCartDto);
    if(!cart) {
      throw new BadRequestException('Error al agregar el producto al carrito');
    }
    return cart;
  }

  async createToken(createCartDto: CreateCartDto, user: UserActiveInterface): Promise<any> {
    
    if(!user){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    await this.updateUserCart(user, createCartDto);
    createCartDto.user_id = user.id;
    const cart = await this.cartRepository.save(createCartDto);
    if(!cart) {
      throw new BadRequestException('Error al agregar el producto al carrito');
    }
    return cart;
  }

  async updateUserCart(user: UserActiveInterface, createCartDto:  CreateCartDto): Promise<any> {
    const carts = await this.findAllCartsActiveBySession(createCartDto);
    if(carts.length > 0){
      for(const cart of carts){
        cart.user_id = user.id;
        await this.cartRepository.update(cart.id, cart);
      }
    }
    return carts;

  }
 
  async findAllCartsActiveBySession( createCartDto: CreateCartDto,): Promise<Cart[]> {
    if(!createCartDto){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    return this.cartRepository.find({ where: { session_id: createCartDto.session_id, status: true } });
  }

  async findAllActiveBySession( sessionCartDto: SessionCartDto): Promise<Cart[]> {
    if(!sessionCartDto){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    return this.cartRepository.find({ where: { session_id: sessionCartDto.session, status: true } });
  }
  
  
  async findAllCartsActiveByUser(user: UserActiveInterface, session: Record<string, any>): Promise<Cart[]> {
    if(!user){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    
    return this.cartRepository.find({ where: { user_id: user.id, status: true } });
  }

  async findAllCarts(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if(!cart) {
      throw new BadRequestException('Carrito no encontrado');
    }
    return cart;
  }

  async updateProduct(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    await this.cartRepository.findOne({ where: { id } });
    const updatedCart = await this.cartRepository.update(id, updateCartDto).then(() => this.findOne(id));
    if(!updatedCart) {
      throw new BadRequestException('Problemas al actualizar el carrito');
    }
    return updatedCart;
  }

  async remove(id: number) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if(!cart) {
      throw new BadRequestException('Carrito no encontrado');
    }
    return this.cartRepository.delete(id);
  }

  async removeAllSession(session: SessionCartDto) {
    const carts = await this.findAllActiveBySession(session);

    for(const cart of carts){
      await this.cartRepository.delete(cart.id);
    }
    return true;
  }

  async removeAllUser(user: UserActiveInterface) {
   const carts = await this.findAllCartsActiveByUser(user, {});
   for(const cart of carts){
     await this.cartRepository.delete(cart.id);
   }
   return true;
  }

  @Cron('0 0 0 * * *') // se ejecuta cada 24 hora todo los dias
  async cleanerCart():Promise<Cart[]>{
    const fecha24 =new Date(Date.now() - 24 * 60 * 60 * 1000);
    const carts = await this.cartRepository.find({ where: { user_id: IsNull(),fecha: LessThan(fecha24)} });
    if(carts.length>0){
      for(const cart of carts){
      await this.remove(cart.id);
      }
    }
    return carts;
  }
}

