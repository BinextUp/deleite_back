import { PurchaseOrder } from "../../purchase-order/entities/purchase-order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'varchar', length: 255 , nullable: true})
    icon: string;

    @Column({type: 'boolean', default: true})
    state: boolean;

    @OneToMany(() => PurchaseOrder, purchaseOrder => purchaseOrder.paymentMethod)
    purchaseOrders: PurchaseOrder[];
     
}
