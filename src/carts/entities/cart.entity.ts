import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne, Entity, Timestamp } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'boolean' , default: true})
    status:boolean;

    @Column({type: 'int'})
    cantidad: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    precio: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;
    
    @Column({type: 'int'})
    product_id: number;

    @Column({type: 'varchar', nullable: true})
    title: string;

    @Column({type: 'varchar', nullable: true})
    description: string;

    @ManyToOne(() => User, (user) => user.carts)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column({type: 'int', nullable: true})
    user_id: number;

    @Column({type: 'varchar', nullable: false})
    session_id: string;
    
}
