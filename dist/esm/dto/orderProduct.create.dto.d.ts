import { OrderProductBaseDto } from './orderProduct.base.dto';
import { OrderItemType } from '../enum/orderItemType';
export declare class OrderProductCreateDto extends OrderProductBaseDto {
    itemType: OrderItemType;
}
