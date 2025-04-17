import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailPurchase } from "../../detail-purchase/entities/detail-purchase.entity";
import { PaymentMethod } from "../../payment-methods/entities/payment-method.entity";
import { User } from "../../users/entities/user.entity";


@Entity('purchase_orders')
export class PurchaseOrder {
        @PrimaryGeneratedColumn()
        id: number;
    
        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        fecha: Date;
    
        @Column({ type: 'decimal', precision: 10, scale: 2 })
        precioNeto: number
    
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
