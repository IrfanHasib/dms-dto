import { OrderItemBaseDto } from './orderItem.base.dto';
import { OrderItemType } from '../enum/orderItemType';
export declare class OrderItemUpsertDto extends OrderItemBaseDto {
    productId: number;
    itemType: OrderItemType;
    id?: number;
}
