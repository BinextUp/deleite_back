import { PaymentMethod } from "src/payment-methods/entities/payment-method.entity";

export const paymentSeed = ()=> [
    {
        name: 'tarjeta de credito',
        description: 'tarjeta de credito',
        icon: 'credit-card.png',
    },
    {
        name: 'paypal',
        description: 'paypal',
        icon: 'paypal.png',
    },
    {
        name: 'binance',
        description: 'binance',
        icon: 'binance.png',
    },
    {
        name: 'el dorado',
        description: 'el dorado',
        icon: 'el-dorado.png',
    }
]