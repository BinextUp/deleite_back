import { Client } from "src/clients/entities/client.entity";
import { Rol } from "../../utils/enums/rol.enum";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToOne } from "typeorm";

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

    @Column({type: 'enum', default: Rol.USER , enum: Rol})
    role:Rol;

    @OneToOne(() => Client,(client) => client.user)
    client: Client;

    @DeleteDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    deletedAt: Date;
}
