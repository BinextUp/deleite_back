import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendMessageWsInterface } from '../../interfaces/send-message-ws.interface';

@Injectable()
export class ApiWhatsappService {
    private readonly requestConfig = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {}
    }

    constructor(private readonly httpService: HttpService) {}

    async ApiSendWhatsapp(messageWS: SendMessageWsInterface): Promise<any> {
        
        try {
            const data = JSON.stringify({
                "token": process.env.WS_TOKEN,
                "to": messageWS.numero.toString(),
                "body": messageWS.message
            });
            const response = await firstValueFrom(
                this.httpService.post(
                    `${process.env.API_WHATSAPP}/${process.env.WS_INSTANCE_ID}/messages/chat`,
                    data,
                    this.requestConfig));
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al enviar el mensaje de whatsapp');
        }
    }

    async ApiGetMessageWhatsapp(): Promise<any> {
        try {
           const params1 = {
            token: process.env.WS_TOKEN,
            page: 1,
            limit: 100,
            status: 'all',
            sort: 'desc'
           }
           this.requestConfig.params = params1;
            const response = await firstValueFrom(
                this.httpService.get(
                    `${process.env.API_WHATSAPP}/${process.env.WS_INSTANCE_ID}/messages`,
                    this.requestConfig
                )
            );
            return response.data;
        } catch (error) {
            throw new BadRequestException('Error al obtener el chat de whatsapp');
        }
    }
}
