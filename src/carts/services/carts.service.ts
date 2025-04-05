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

  async create(createCartDto: CreateCartDto, user: UserActiveInterface): Promise<Cart> {
    createCartDto.user_id = user.id;
    const cart = await this.cartRepository.save(createCartDto);
    if(!cart) {
      throw new BadRequestException('Error al agregar el producto al carrito');
    }
    return cart;
  }

  async findAllCartsActiveByUser(user: UserActiveInterface,): Promise<Cart[]> {
    return this.cartRepository.find({ where: { user_id: user.id, status: true } });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if(!cart) {
      throw new BadRequestException('Carrito no encontrado');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
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
}
