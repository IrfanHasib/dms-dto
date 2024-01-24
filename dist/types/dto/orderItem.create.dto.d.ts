import { OrderItemBaseDto } from './orderItem.base.dto';
import { OrderItemType } from '../enum/orderItemType';
export declare class OrderItemCreateDto extends OrderItemBaseDto {
    itemType: OrderItemType;
}
