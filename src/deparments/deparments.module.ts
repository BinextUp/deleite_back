import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DeparmentsService } from './services/deparments.service';
import { DeparmentsController } from './controllers/deparments.controller';
import { ApiModule } from '../utils/API/api.module';
import { LocalStorageMiddleware } from '../utils/local-storage/local-storage.middleware';
import { LocalStorageModule } from '../utils/local-storage/local-storage.module';

@Module({
  controllers: [DeparmentsController],
  providers: [DeparmentsService],
  imports: [ApiModule,LocalStorageModule],
})
export class DeparmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalStorageMiddleware)
      .forRoutes('*');
  }
} 
