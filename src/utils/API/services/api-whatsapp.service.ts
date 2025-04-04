import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendMessageWsInterface } from '../../interfaces/send-message-ws.interface';

@Injectable()
export class ApiWhatsappService {
    private readonly requestConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
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
}
