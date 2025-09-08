import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './produts/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ApiModule } from './utils/API/api.module';
import { WsModule } from './ws/ws.module';
import { CartsModule } from './carts/carts.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { DetailPurchaseModule } from './detail-purchase/detail-purchase.module';
import { CommentsModule } from './comments/comments.module';
import { DeparmentsModule } from './deparments/deparments.module';
import database from './utils/database/config/root-typeorm';
import { LocalStorageMiddleware } from './utils/local-storage/local-storage.middleware';
import { LocalStorageModule } from './utils/local-storage/local-storage.module';
import { AppController } from './app.controller';
import { SeedsModule } from './utils/database/seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot(database()),
    AuthModule, 
    UsersModule, 
    ClientsModule, 
    ProductsModule, 
    CategoriesModule,
    ApiModule,
    WsModule,
    CartsModule,
    PaymentMethodsModule,
    PurchaseOrderModule,
    DetailPurchaseModule,
    CommentsModule,
    DeparmentsModule,
    LocalStorageModule,
    SeedsModule
  ],
  providers: [],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalStorageMiddleware)
      .forRoutes("*"); // Se aplica a todas las rutas
  }
}

