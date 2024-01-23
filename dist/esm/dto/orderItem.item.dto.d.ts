import { OrderItemBaseDto } from './orderItem.base.dto';
import { OrderItemType } from '../enum/orderItemType';
import { BaseDBFieldsDto } from './baseDBFields.dto';
import { ProductItemDto } from './product.item.dto';
declare const OrderItemItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & OrderItemBaseDto, typeof BaseDBFieldsDto & typeof OrderItemBaseDto, false>;
export declare class OrderItemItemDto extends OrderItemItemDto_base {
    product: ProductItemDto;
    itemType: OrderItemType;
    cost: number;
    regular_price: number;
    sale_price: number;
    mrp: number;
    quantity: number;
    totalRegularAmount: number;
    totalSaleAmount: number;
    totalDiscount: number;
    oldQuantity: number;
    oldTotalRegularAmount: number;
    oldTotalSaleAmount: number;
    oldTotalDiscount: number;
}
export {};
