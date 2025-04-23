import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { AsyncLocalStorage } from 'async_hooks';
import { ApiDepCatService } from '../../utils/API/services/api-dep-cat.service';
import { TOKEN_TEMP } from '../../utils/token-temp/token-temp';
import { PageDeparmentDto } from '../dto/page-deparment.dto';
import { ApiProductService } from '../../utils/API/services/api-product.service';

@Injectable()
export class DeparmentsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly apiDepCatService: ApiDepCatService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly apiProductService: ApiProductService
  ) {}

  searchToken(): string {
    const token = TOKEN_TEMP.length > 0 ? TOKEN_TEMP[0].token : this.asyncLocalStorage.getStore().token;
    console.log(token);
    return token;
  }
 
  async apiGetAllDepartments():Promise<any> {
    const departmentsCache = await this.cacheManager.get('departments');
    if(!departmentsCache){
      const params = await this.paramsAllDepartments();
      const departments = await this.apiDepCatService.ApiGetAllDepartments(this.searchToken(), params);
      await this.cacheManager.set('departments', departments.data);
      return departments.data;
    }
    return departmentsCache;
  }

 
  async paramsAllDepartments():Promise<any> {
   const params = {
    Active:true,
   };
   return params;
  }

  async apiGetOneDepartment(id: number, pageDeparmentDto: PageDeparmentDto):Promise<any> {
    const departmentCache = await this.cacheManager.get(`department-${id}-Page:${pageDeparmentDto.Page}`);
    if(!departmentCache){
      const params = await this.paramsOneDepartment(id,pageDeparmentDto);
      const department = await this.apiProductService.getApiSearchProductInventoryByWIS(this.searchToken(), params);
      await this.cacheManager.set(`department-${id}-Page:${pageDeparmentDto.Page}`, department);
      return department;
    }
    return departmentCache;
  }

  async paramsOneDepartment(id: number, pageDeparmentDto: PageDeparmentDto):Promise<any> {
    const params = {
      CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
      ItemsPerPage:100,
      Page:pageDeparmentDto.Page,
      DepartamentID:id
    };
    return params;
  }
}
