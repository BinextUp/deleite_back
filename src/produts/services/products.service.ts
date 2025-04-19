import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER , Cache} from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsyncLocalStorage } from 'async_hooks';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { CategoriesService } from '../../categories/services/categories.service';
import { ApiProductService } from '../../utils/API/services/api-product.service';
import { ApiDollarService } from '../../utils/API/services/api-dollar.service';
import { TOKEN_TEMP } from '../../utils/token-temp/token-temp';

@Injectable()
export class ProductsService {
 
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly apiDollarService: ApiDollarService,
    private readonly apiProductService: ApiProductService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    
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

  searchToken(): string {
    const token = TOKEN_TEMP.length > 0 ? TOKEN_TEMP[0].token : this.asyncLocalStorage.getStore().token;
    console.log(token);
    return token;
  }
 
  async getApiProducts(): Promise<any> {
    return this.apiProductService.ApiGetProducts();
  }

  async getApiDollars(): Promise<any> {
    return this.apiDollarService.ApiGetDollars();
  }

  async getApiProductByWIS(): Promise<any> {

    const value = await this.cacheManager.get('products');
    if(!value) {
      const products = await this.apiProductService.ApiGetProductByWIS(this.searchToken());
      await this.cacheManager.set('products', products);
      return products;
    }
    return value;
  }

  async getApiSearchProductInventoryByWIS(params: any,name_param:any[]): Promise<any> {
    
    const value = await this.cacheManager.get(`${name_param[0]}:${params[name_param[0]]}`);
    if(!value) {
      const newParams = this.filterParams(name_param[0],params);
      const products_inventory = await this.apiProductService.getApiSearchProductInventoryByWIS(this.searchToken(), newParams);
      await this.cacheManager.set(`${name_param[0]}:${params[name_param[0]]}`, products_inventory);
      return products_inventory;
    }
    return value;
  }

  filterParams(name_param: any, params: any) {

    const newParams = {
      CompanyStoreID : Number(process.env.COMPANY_STORE_ID),
      ItemsPerPage:100,
      name_param: params.name_param
    };
    return newParams;
  }
}
