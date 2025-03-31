import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../../categories/services/categories.service';
import { ApiProductService } from '../../utils/API/services/api-product.service';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly apiProductService: ApiProductService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoriesService.findOne(createProductDto.category_id);
    const product = await this.productRepository.save(createProductDto);
    if(!product) {
      throw new BadRequestException('Error al crear el producto');
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category']
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if(!product) {
      throw new BadRequestException('Producto no encontrado');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    if(id <= 0 || id === null) {
      throw new BadRequestException('Id no proporcionado');
    }
    await this.findOne(id);
    return this.productRepository.update(id, updateProductDto).then(() => this.findOne(id));
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
 
  async getApiProducts(): Promise<any> {
    return this.apiProductService.ApiGetProducts();
  }

}
