import { Category} from "src/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id',referencedColumnName: 'id' })
    category: Category;

    @Column({ type: 'int' })
    category_id: number;
}
