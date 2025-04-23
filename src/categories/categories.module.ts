import { Module } from '@nestjs/common';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { Category } from './entities/category.entity';
import { ApiModule } from '../utils/API/api.module';
import { LocalStorageModule } from '../utils/local-storage/local-storage.module';
import { LocalStorageMiddleware } from '../utils/local-storage/local-storage.middleware';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category]),ApiModule,LocalStorageModule],
  exports: [CategoriesService]
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalStorageMiddleware)
      .forRoutes('*');
  }
}
