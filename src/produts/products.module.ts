import { Module,MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { LocalStorageModule } from '../utils/local-storage/local-storage.module';
import { LocalStorageMiddleware } from '../utils/local-storage/local-storage.middleware';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  CategoriesModule,LocalStorageModule,AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]

})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalStorageMiddleware)
      .forRoutes('*');
  }
}
