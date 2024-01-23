import { OrderBaseDto } from './order.base.dto';
import { OrderItemUpsertDto } from './orderItem.upsert.dto';
export declare class OrderCreateDto extends OrderBaseDto {
    customerId: number;
    orderItems?: OrderItemUpsertDto[];
}
