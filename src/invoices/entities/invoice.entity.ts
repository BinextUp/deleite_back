import { PaymentMethod } from "../../payment-methods/entities/payment-method.entity";
import { InvoiceDetail } from "../../invoice-detail/entities/invoice-detail.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaFactura: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precioNeto: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    iva: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    descuento: number;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.invoices)
    @JoinColumn({name: 'paymentMethod_id', referencedColumnName: 'id'})
    paymentMethod: PaymentMethod;

    @Column({ type: 'int' })
    paymentMethod_id: number;

    @ManyToOne(() => User, user => user.invoices)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column({type: 'int'})
    user_id: number;

    @OneToMany(() => InvoiceDetail, invoiceDetail => invoiceDetail.invoice)
    invoiceDetails: InvoiceDetail[];

}
