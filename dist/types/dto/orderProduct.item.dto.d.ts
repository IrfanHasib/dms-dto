import { OrderProductBaseDto } from './orderProduct.base.dto';
import { OrderItemType } from '../enum/orderItemType';
import { BaseDBFieldsDto } from './baseDBFields.dto';
import { ProductItemDto } from './product.item.dto';
declare const OrderProductItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & OrderProductBaseDto, typeof BaseDBFieldsDto & typeof OrderProductBaseDto, false>;
export declare class OrderProductItemDto extends OrderProductItemDto_base {
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
