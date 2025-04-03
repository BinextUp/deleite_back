import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiProductService } from './services/api-product.service';
import { ApiDollarService } from './services/api-dollar.service';

@Global() 
@Module({
    imports: [HttpModule],
    providers: [ApiProductService, ApiDollarService],
    exports:[ApiProductService, ApiDollarService]
})
export class ApiModule {}
