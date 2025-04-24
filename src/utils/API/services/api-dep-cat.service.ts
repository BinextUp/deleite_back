import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class ApiDepCatService {
   
    constructor(private readonly httpService: HttpService) {}

    private readonly requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.X_API_KEY,
            'Authorization': ''
        },
        params: {}
    }
    async ApiGetAllDepartments(token: string, params: any): Promise<any> {
        try {
            this.requestConfig.params = params;
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            console.log(this.requestConfig,`${process.env.API_MASTER_WIS}/api/departament`);
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_MASTER_WIS}/api/departament`, this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener los departamentos  de la API externa');
        }
    }

    async ApiGetAllCategories(token: string, params: any): Promise<any> {
        try {
            this.requestConfig.params = params;
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            console.log(this.requestConfig,`${process.env.API_MASTER_WIS}/api/category`);
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_MASTER_WIS}/api/category`, this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener las categorías  de la API externa');
        }
    }

    async ApiGetAllSubCategories(token: string, params: any): Promise<any> {
        try {
            this.requestConfig.params = params;
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            console.log(this.requestConfig,`${process.env.API_MASTER_WIS}/api/SubCategory`);
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_MASTER_WIS}/api/SubCategory`, this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener las subcategorías  de la API externa');
        }
    }

}
