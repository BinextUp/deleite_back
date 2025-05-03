import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './services/seeds.service';
import { UsersModule } from '../../../users/users.module';
import { Estatu } from './estatu-app/estatu.entity';
import { PaymentMethodsModule } from '../../../payment-methods/payment-methods.module';
@Module({
  providers: [SeedsService],
  imports:[TypeOrmModule.forFeature([Estatu]),UsersModule,PaymentMethodsModule]
})
export class SeedsModule {}
