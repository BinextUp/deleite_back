import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ApiAuthService } from '../API/services/api-auth.service';
import { TokenTempInterface } from '../interfaces/token-temp';
import { TOKEN_TEMP } from '../token-temp/token-temp';

@Injectable()
export class LocalStorageMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly apiAuthService: ApiAuthService) {}
  
  async use(req: any, res: any, next: () => void) {
   const json = await this.setDataLocalStorage(TOKEN_TEMP);
   console.log("Entro al middleware");
   this.asyncLocalStorage.run(json, ()=>{
      next();
    });
  }

   async getToken(): Promise<any> {
    const {token, dateCreateToken, dateExpiredToken} = await this.apiAuthService.signInApiExterno();
   
    return{
        token,
        fecha_creacion: dateCreateToken,
        fecha_expiracion: dateExpiredToken
    }
  }
  async setDataLocalStorage(dataLS: TokenTempInterface[]): Promise<TokenTempInterface>{
 
    if(dataLS.length === 0){

      dataLS.push( await this.getToken());
    }
    if(await this.ValidarFechaHoraToken(dataLS[dataLS.length - 1].fecha_expiracion)){
      dataLS.pop();
      dataLS.push( await this.getToken());
    }
    return dataLS[dataLS.length - 1];
  }

    async ValidarFechaHoraToken(fecha_expiracion: string): Promise<boolean> {
    const fechaApi = new Date(fecha_expiracion);
    const fecha_actual = new Date();
    return fecha_actual > fechaApi;
  }
}
