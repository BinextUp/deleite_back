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
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailModule } from './invoice-detail/invoice-detail.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { DetailPurchaseModule } from './detail-purchase/detail-purchase.module';
import { CommentsModule } from './comments/comments.module';
import database from './utils/config/root-typeorm';

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
    InvoicesModule,
    InvoiceDetailModule,
    PaymentMethodsModule,
    PurchaseOrderModule,
    DetailPurchaseModule,
    CommentsModule,

  ],
  providers: []
})
export class AppModule {}

