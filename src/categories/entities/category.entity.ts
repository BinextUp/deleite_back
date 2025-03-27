
import { Product } from "src/produts/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
