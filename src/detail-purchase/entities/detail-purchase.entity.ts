import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PurchaseOrder } from "../../purchase-order/entities/purchase-order.entity";

@Entity('detail_purchases')
export class DetailPurchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_unit: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    sub_total: number;

    @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.detailPurchases)
    @JoinColumn({ name: 'purchase_order_id',referencedColumnName: 'id' })
    purchaseOrder: PurchaseOrder;

    @Column({ type: 'int' })
    purchase_order_id: number;

    @Column({ type: 'int' })
    wis_product_id: number;

    @Column({type: 'varchar' , nullable: true, length: 100})
    wis_product_name: string;
    
}
