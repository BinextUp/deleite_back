import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estatu')
export class Estatu {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'varchar', length: 100})
    name: string;
}
