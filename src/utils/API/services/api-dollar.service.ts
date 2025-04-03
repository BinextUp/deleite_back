import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiDollarService {
    constructor(private readonly httpService: HttpService) {}

    async ApiGetDollars(): Promise<any> {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_DOLLAR}`));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener los dolares  de la API externa');
        }
    }
}
