import { BadRequestException, Injectable,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { AsyncLocalStorage } from 'async_hooks';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { ApiDepCatService } from '../../utils/API/services/api-dep-cat.service';
import { TOKEN_TEMP } from '../../utils/token-temp/token-temp';
import { PageCatSubCatDto } from '../dto/page-cat-subcat.dto';
import { ApiProductService } from '../../utils/API/services/api-product.service';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly apiDepCatService: ApiDepCatService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly apiProductService: ApiProductService
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {

    const category = await this.categoryRepository.findOne({ where: { id } });
    if(!category) {
      throw new BadRequestException('Categoría no encontrada');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.findOne(id);
    return await this.categoryRepository.update(id, updateCategoryDto).then(() => this.findOne(id));
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }

  private searchToken(): string {
    const token = TOKEN_TEMP.length > 0 ? TOKEN_TEMP[0].token : this.asyncLocalStorage.getStore().token;
    console.log(token);
    return token;
  }

  async findAllApi(): Promise<any> {
    const categoriesCache = await this.cacheManager.get('categories');
    if(!categoriesCache){
      const params = await this.paramsAllCategories();
      const categories = await this.apiDepCatService.ApiGetAllCategories(this.searchToken(), params);
      await this.cacheManager.set('categories', categories.data);
      return categories.data;
    }
    return categoriesCache;
  }

  async paramsAllCategories():Promise<any> {
    const params = {
     Active:true,
    };
    return params;
   }
  
  async apiGetProductByCategory(id: number, pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    const categoryCache = await this.cacheManager.get(`category-${id}-Page:${pageCatSubCatDto.Page}`);
    if(!categoryCache){
      const params = await this.paramsOneCategory(id,pageCatSubCatDto);
      const category = await this.apiProductService.getApiSearchProductInventoryByWIS(this.searchToken(), params);
      await this.cacheManager.set(`category-${id}-Page:${pageCatSubCatDto.Page}`, category);
      return category;
    }
    return categoryCache;
  }
  async paramsOneCategory( id: number, pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    const params = {
      CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
      ItemsPerPage:15,
      Page:pageCatSubCatDto.Page,
      CategoryID:id
    };
    return params;
  }

  async findAllSubCategoriesApi(): Promise<any> {
    const subCategoriesCache = await this.cacheManager.get('subCategories');
    if(!subCategoriesCache){
      const params = await this.paramsAllSubCategories();
      const subCategories = await this.apiDepCatService.ApiGetAllSubCategories(this.searchToken(), params);
      await this.cacheManager.set('subCategories', subCategories.data);
      return subCategories.data;
    }
    return subCategoriesCache;
  }

  async paramsAllSubCategories():Promise<any> {
    const params = {
      Active:true,
    };
    return params;
  }

  async apiGetProductBySubCategory(id: number, pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    const subCategoryCache = await this.cacheManager.get(`subCategory-${id}-Page:${pageCatSubCatDto.Page}`);
    if(!subCategoryCache){
      const params = await this.paramsOneSubCategory(id,pageCatSubCatDto);
      const subCategory = await this.apiProductService.getApiSearchProductInventoryByWIS(this.searchToken(), params);
      await this.cacheManager.set(`subCategory-${id}-Page:${pageCatSubCatDto.Page}`, subCategory);
      return subCategory;
    }
    return subCategoryCache;
  }

  async paramsOneSubCategory( id: number, pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    const params = {
      CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
      ItemsPerPage:15,
      Page:pageCatSubCatDto.Page,
      SubCategoryID:id
    };
    return params;
  }

}
