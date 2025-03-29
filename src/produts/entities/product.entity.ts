import { Category} from "src/categories/entities/category.entity";
import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id',referencedColumnName: 'id' })
    category: Category;

    @Column({ type: 'int' })

    category_id: number;
}
