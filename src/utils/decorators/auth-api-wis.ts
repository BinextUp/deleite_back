import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiAuthService } from '../../utils/API/services/api-auth.service';


export class ApiConsultarService{
  constructor(private readonly apiAuthService: ApiAuthService) {}

  async signInApiExterno(): Promise<any> {
    return this.apiAuthService.signInApiExterno();
  }
}

export const AuthApiWis = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;


  },
);