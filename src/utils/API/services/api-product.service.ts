import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiProductService {
    constructor(private readonly httpService: HttpService) {}

    async ApiGetProducts(): Promise<any> {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_EXTERN}`));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener los productos  de la API externa');
        }
    }
}
