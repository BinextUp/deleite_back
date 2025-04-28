import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { Cart } from '../entities/cart.entity';
import { UserActiveInterface } from 'src/utils/interfaces/user-active.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CartsService {
  
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async createSession(createCartDto: CreateCartDto, session: Record<string, any>): Promise<Cart> {
    
    if(!session){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    createCartDto.session_id = session.id;
    const cart = await this.cartRepository.save(createCartDto);
    if(!cart) {
      throw new BadRequestException('Error al agregar el producto al carrito');
    }
    return cart;
  }
  async createToken(createCartDto: CreateCartDto, user: UserActiveInterface, session: Record<string, any>): Promise<any> {
    
    if(!user && !session){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    await this.updateUserCart(user, session);
    createCartDto.user_id = user.id;
    createCartDto.session_id = session.id;
    const cart = await this.cartRepository.save(createCartDto);
    if(!cart) {
      throw new BadRequestException('Error al agregar el producto al carrito');
    }
    return cart;
  }

  async updateUserCart(user: UserActiveInterface, session: Record<string, any>): Promise<any> {
    const carts = await this.findAllCartsActiveBySession(session);
    if(carts.length > 0){
      for(const cart of carts){
        cart.user_id = user.id;
        await this.cartRepository.update(cart.id, cart);
      }
    }
    return carts;

  }
 
  async findAllCartsActiveBySession( session: Record<string, any>): Promise<Cart[]> {
    if(!session){
      throw new BadRequestException('No se ha encontrado un usuario ni una sesion');
    }
    return this.cartRepository.find({ where: { session_id: session.id, status: true } });
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

  async removeAllSession(session: Record<string, any>) {
    const carts = await this.findAllCartsActiveBySession(session);

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
}
