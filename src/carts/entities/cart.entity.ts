import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, DeleteDateColumn,JoinColumn, ManyToOne, Entity } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'boolean' , nullable: false, default: true})
    status:boolean;

    @Column({type: 'int'})
    cantidad: number;

    @Column({type: 'decimal'})
    precio: number;

    @DeleteDateColumn({nullable: true, default: new Date()})
    deletedAt: Date;

    @Column({type: 'int'})
    product_id: number;

    @ManyToOne(() => User, (user) => user.carts)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column({type: 'int'})
    user_id: number;
}
