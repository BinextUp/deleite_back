import { Client } from "src/clients/entities/client.entity";
import { Rol } from "../../utils/enums/rol.enum";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Cart } from "../../carts/entities/cart.entity";
import { PurchaseOrder } from "../../purchase-order/entities/purchase-order.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100 , nullable: false})
    name: string;

    @Column({type: 'varchar', length: 100 , unique: true, nullable: false})
    email: string;

    @Column({type: 'text',  nullable: false})
    password: string

    @Column({type: 'boolean', default: true })
    isActive: boolean;

    @Column({type: 'boolean', default: false })
    termins: boolean;

    @Column({type: 'enum', default: Rol.USER , enum: Rol})
    role:Rol;

    @OneToOne(() => Client,(client) => client.user)
    client: Client;

    @OneToMany(() => Cart, (cart) => cart.user) 
    carts: Cart[];

    @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.user)
    purchaseOrders: PurchaseOrder[];

}
