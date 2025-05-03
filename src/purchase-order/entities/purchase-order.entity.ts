import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailPurchase } from "../../detail-purchase/entities/detail-purchase.entity";
import { PaymentMethod } from "../../payment-methods/entities/payment-method.entity";
import { User } from "../../users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Estatu } from "src/utils/database/seeds/estatu-app/estatu.entity";


@Entity('purchase_orders')
@Injectable()
export class PurchaseOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 , nullable: true, default: 16})
    iva: number;

    @ManyToOne(() => Estatu, estatu => estatu.purchaseOrders)
    @JoinColumn({name: 'estatu_id', referencedColumnName: 'id'})
    estatu: Estatu;

    @Column({ type: 'int', default: 1 })
    estatu_id: number;

    @Column({ type: 'int', default: 0 })
    wis_order_id: number;

    @Column({ type: 'int'})
    order_number: number;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.purchaseOrders)
    @JoinColumn({name: 'paymentMethod_id', referencedColumnName: 'id'})
    paymentMethod: PaymentMethod;

    @Column({ type: 'int' })
    paymentMethod_id: number;

    @ManyToOne(() => User, user => user.purchaseOrders)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column({type: 'int'})
    user_id: number;

    @OneToMany(() => DetailPurchase, detailPurchase => detailPurchase.purchaseOrder)
    detailPurchases: DetailPurchase[];
}
