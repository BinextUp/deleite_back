import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class ApiProductService {
   
    constructor(private readonly httpService: HttpService) {}

    private readonly requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.X_API_KEY,
            'Authorization': ''
        },
        params: {}
    }
    async ApiGetProducts(): Promise<any> {
        try {
            const response = await firstValueFrom(this.httpService.get(`${process.env.API_EXTERN}`));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener los productos  de la API externa');
        }
    }

    async ApiGetProductByWIS(token: string): Promise<any> {
        try {
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            const response = await firstValueFrom(this.httpService.get(
                `${process.env.API_PRODUCT_WIS}/api/product`,
                this.requestConfig));
            return response.data.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener el producto  de la API externa de Wis');
        }
    }

    async getApiSearchProductInventoryByWIS(token: string, params: any): Promise<any> {
        try {
            this.requestConfig.params = params;
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            const response = await firstValueFrom(this.httpService.get(
                `${process.env.API_PRODUCT_WIS}/api/inventory/productinventory`,
                this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener el producto del inventario  de la API externa de Wis');
        }
    }

    async createApiPurchaseOrder(token: string, params: any): Promise<any> {
        try {
            const data = JSON.stringify(params);
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            const response = await firstValueFrom(this.httpService.post(
                `${process.env.API_WEBSTORE_WIS}/api/order`,
                data,
                this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al crear la orden de la API externa de Wis');
        }
    }

    async getApiPurchaseOrderStatus(token: string, params: any): Promise<any> {
        try {
            this.requestConfig.headers.Authorization = `Bearer ${token}`;
            this.requestConfig.params = params;
            const response = await firstValueFrom(this.httpService.get(
                `${process.env.API_WEBSTORE_WIS}/api/order`,
                this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener el estado de la orden de la API externa de Wis');
        }
    }
}
