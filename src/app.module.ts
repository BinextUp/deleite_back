import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './produts/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ApiModule } from './utils/API/api.module';
import { WsModule } from './ws/ws.module';
import { CartsModule } from './carts/carts.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailModule } from './invoice-detail/invoice-detail.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import database from './utils/config/root-typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(database()),
    TasksModule,
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
  ],
  providers: []
})
export class AppModule {}
