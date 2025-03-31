import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiProductService } from './services/api-product.service';

@Global() 
@Module({
    imports: [HttpModule],
    providers: [ApiProductService],
    exports:[ApiProductService]
})
export class ApiModule {}
