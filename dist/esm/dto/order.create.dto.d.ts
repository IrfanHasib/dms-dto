import { OrderBaseDto } from './order.base.dto';
import { OrderItemCreateDto } from './orderItem.create.dto';
export declare class OrderCreateDto extends OrderBaseDto {
    customerId: number;
    orderItems?: OrderItemCreateDto[];
}
