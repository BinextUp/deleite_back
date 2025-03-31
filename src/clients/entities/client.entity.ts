import { User } from "../../users/entities/user.entity";
import {  Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar' , nullable: true, length: 100})
    name: string;

    @Column({type: 'varchar' , nullable: true, length: 100})
    last_name: string;

    @Column({type: 'varchar' , nullable: true, length: 100})
    cedula: string;

    @Column({type: 'varchar' , nullable: true, length: 100})
    phone: string;
    
    @OneToOne(() => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
    
    @Column({type: 'int'})
    user_id: number;
}
