import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../../../../users/services/users.service';
import{userSeeds} from '../../seeds/user/user.seed'
import { CreateUserDto } from '../../../../users/dto/create.user.dto';
import { Estatu } from '../estatu-app/estatu.entity';
import { estutuSeeds } from '../estatu-app/estatu.seed';
import { paymentSeed } from '../payment/payment.seed';
import { PaymentMethodsService } from '../../../../payment-methods/services/payment-methods.service';
@Injectable()
export class SeedsService {

    constructor(
        @InjectRepository(Estatu) private readonly estatuRepository: Repository<Estatu>,
        private readonly usersService: UsersService,
        private readonly paymentMethodsService: PaymentMethodsService
    ){}

    async seedUsers(){
        const users= userSeeds();
        for(const user of users){
            const usercreate:CreateUserDto={
                name: user.name,
                email: user.email,
                password: user.password,
                termins: true
            };
           await this.usersService.createUserSeed(usercreate);
        }
    }
    
    async seedEstatuApp(){
        const estatus = estutuSeeds();
        for(const estatu of estatus){
            const estatuExit = await this.estatuRepository.findOne({where:{name:estatu.name}})
            if(!estatuExit){
                await this.estatuRepository.save(estatu);
            }
        }
    }

    async seedPaymentMethods(){
        const paymentMethods = paymentSeed();
        for(const paymentMethod of paymentMethods){
            await this.paymentMethodsService.createPaymentSeed(paymentMethod);
        }
    }
    async runSeeds() {
        await this.seedUsers();
        await this.seedEstatuApp();
        await this.seedPaymentMethods();


        
        // Puedes agregar más seeds aquí (productos, roles, etc.)
    }
}
