import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { AsyncLocalStorage } from 'async_hooks';
import { ApiDepCatService } from '../../utils/API/services/api-dep-cat.service';
import { TOKEN_TEMP } from '../../utils/token-temp/token-temp';
import { PageDeparmentDto } from '../dto/page-deparment.dto';
import { ApiProductService } from '../../utils/API/services/api-product.service';
import { Active, paramsDepartment } from '../../utils/api-params/api-params';

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
   
    return token;
  }
 
  async apiGetAllDepartments():Promise<any> {
    const departmentsCache = await this.cacheManager.get('departments');
    if(!departmentsCache){
      const departments = await this.apiDepCatService.ApiGetAllDepartments(this.searchToken(), Active());
      await this.cacheManager.set('departments', departments.data);
      return departments.data;
    }
    return departmentsCache;
  }


  async apiGetOneDepartment(id: number, pageDeparmentDto: PageDeparmentDto):Promise<any> {
    const departmentCache = await this.cacheManager.get(`department-${id}-Page:${pageDeparmentDto.Page}`);
    if(!departmentCache){
    
      const department = await this.apiProductService.getApiSearchProductInventoryByWIS(this.searchToken(), paramsDepartment(id,pageDeparmentDto));
      await this.cacheManager.set(`department-${id}-Page:${pageDeparmentDto.Page}`, department);
      return department;
    }
    return departmentCache;
  }
}
