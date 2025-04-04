import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiProductService } from './services/api-product.service';
import { ApiDollarService } from './services/api-dollar.service';
import { ApiWhatsappService } from './services/api-whatsapp.service';

@Global() 
@Module({
    imports: [HttpModule],
    providers: [ApiProductService, ApiDollarService, ApiWhatsappService],
    exports:[ApiProductService, ApiDollarService, ApiWhatsappService]
})
export class ApiModule {}
