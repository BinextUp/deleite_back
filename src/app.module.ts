import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './produts/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.SUPABASE_BASE_DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
   
  }),
  TasksModule,
  AuthModule, 
  UsersModule, 
  PaymentsModule, 
  ClientsModule, 
  ProductsModule, 
  CategoriesModule
  ]
})
export class AppModule {}
