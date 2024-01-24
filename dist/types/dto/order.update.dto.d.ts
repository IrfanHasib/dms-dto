import { OrderBaseDto } from './order.base.dto';
import { OrderItemUpdateDto } from './orderItem.update.dto';
export declare class OrderUpdateDto extends OrderBaseDto {
    orderItems?: OrderItemUpdateDto[];
}
