import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';
import { PaymentMethod } from '../entities/payment-method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(@InjectRepository(PaymentMethod) 
  private readonly paymentMethodRepository: Repository<PaymentMethod>) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return 'This action adds a new paymentMethod';
  }

  findAll() {
    return `This action returns all paymentMethods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentMethod`;
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return `This action updates a #${id} paymentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethod`;
  }
  
  async createPaymentSeed(paymentMethod: CreatePaymentMethodDto): Promise<any> {
    const nameExit=  await this.findByNameSeed(paymentMethod.name)
     if(nameExit){ 
        return nameExit; 
     }
     else{
        const newUser= await this.paymentMethodRepository.save(paymentMethod);
        return newUser;   
     } 
 }

 async findByNameSeed(name: string): Promise<boolean> {
     const paymentMethod = await this.paymentMethodRepository.findOneBy({name});
     return !!paymentMethod;
 }
}
