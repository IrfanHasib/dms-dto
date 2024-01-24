import { OrderBaseDto } from './order.base.dto';
import { OrderItemUpdateDto } from './orderItem.update.dto';
export declare class OrderCreateDto extends OrderBaseDto {
    orderItems?: OrderItemUpdateDto[];
}
