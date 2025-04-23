import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiProductService } from './services/api-product.service';
import { ApiDollarService } from './services/api-dollar.service';
import { ApiWhatsappService } from './services/api-whatsapp.service';
import { ApiAuthService } from './services/api-auth.service';
import { ApiDepCatService } from './services/api-dep-cat.service';

@Global() 
@Module({
    imports: [HttpModule],
    providers: [ApiProductService, ApiDollarService, ApiWhatsappService, ApiAuthService, ApiDepCatService],
    exports:[ApiProductService, ApiDollarService, ApiWhatsappService, ApiAuthService, ApiDepCatService]
})
export class ApiModule {}
