import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ApiAuthService } from '../API/services/api-auth.service';
import { TokenTempInterface } from '../interfaces/token-temp';
//import { TOKEN_TEMP } from '../token-temp/token-temp';

@Injectable()
export class LocalStorageMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly apiAuthService: ApiAuthService) {}
  
  async use(req: any, res: any, next: () => void) {

    const json = await this.setDataLocalStorage();
    this.asyncLocalStorage.run(json, ()=>{
      next();
    });
  }

  async setDataLocalStorage(): Promise<TokenTempInterface>{
 
    const token = await this.apiAuthService.getValidToken();
    console.log('TOKEN TEMPORAL', token);
    return token;
  }

  
}
