import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiAuthService {
    private readonly requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.X_API_KEY,
        }
    }

    private readonly data = JSON.stringify({
        "username": process.env.USER_WIS,
        "password": process.env.PASS_WIS,
        "CompanyStoreID": process.env.COMPANY_STORE_ID
    });
        

    constructor(private readonly httpService: HttpService) {}

    async signInApiExterno(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${process.env.API_AUTH_WIS}/api/authentication/login`, 
                this.data, 
                this.requestConfig)
            );
            return response.data.data;
        } catch (error) {
            throw new BadRequestException('Error al iniciar sesion  de la API externa');
        }
    }

    async refreshTokenApiExterno(refreshToken: string): Promise<any> {
        try {
            const data = JSON.stringify({
                "refreshToken": refreshToken
            });
            const response = await firstValueFrom(
                this.httpService.post(`${process.env.API_AUTH_WIS}/api/authentication/refresh`, 
                data, 
                this.requestConfig)
            );
            return response.data.data;
        } catch (error) {
            throw new BadRequestException('Error al iniciar sesion  de la API externa');
        }
    }
}
