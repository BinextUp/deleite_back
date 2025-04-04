import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiWhatsappService } from 'src/utils/API/services/api-whatsapp.service';
import { SendMessageWsInterface } from 'src/utils/interfaces/send-message-ws.interface';

@Controller('ws')
export class WsController {
    constructor(private readonly apiWhatsappService: ApiWhatsappService) {}
    
    @Post('send-message')
    async sendMessage(@Body() messageWS: SendMessageWsInterface): Promise<any> {
        return this.apiWhatsappService.ApiSendWhatsapp(messageWS);
    }

    @Get('get-message')
    async getMessage(): Promise<any> {
        return this.apiWhatsappService.ApiGetMessageWhatsapp();
    }
}
