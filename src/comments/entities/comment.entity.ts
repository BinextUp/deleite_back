import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";


@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    comment: string;

    @Column({ type: 'int' })
    wis_product_id: number;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
    

    @Column({type: 'int'})
    user_id: number;

}
