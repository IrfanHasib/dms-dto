import { OrderBaseDto } from './order.base.dto';
import { OrderProductCreateDto } from './orderProduct.create.dto';
import { OrderPaymentCreateDto } from './orderPayment.create.dto';
export declare class OrderCreateDto extends OrderBaseDto {
    orderProducts?: OrderProductCreateDto[];
    orderPayments?: OrderPaymentCreateDto[];
}
