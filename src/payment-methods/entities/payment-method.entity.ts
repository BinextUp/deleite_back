import { Invoice } from "src/invoices/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'varchar', length: 255 , nullable: true})
    icon: string;

    @Column({type: 'boolean', default: true})
    state: boolean;

    @OneToMany(() => Invoice, invoice => invoice.paymentMethod)
    invoices: Invoice[];
}
