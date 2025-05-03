import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PurchaseOrder } from "../../../../purchase-order/entities/purchase-order.entity";

@Entity('estatu')
export class Estatu {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'varchar', length: 100})
    name: string;

    @OneToMany(() => PurchaseOrder, purchaseOrder => purchaseOrder.estatu)
    purchaseOrders: PurchaseOrder[];
}
