import { Invoice } from "../../invoices/entities/invoice.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('invoice_details')
export class InvoiceDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    num_invoice: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    sub_total: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
    @JoinColumn({ name: 'invoice_id',referencedColumnName: 'id' })
    invoice: Invoice;

    @Column({ type: 'int' })
    invoice_id: number;

    @Column({ type: 'int' })
    product_id: number;
}
