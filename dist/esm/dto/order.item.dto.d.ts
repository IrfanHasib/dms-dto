import { BaseDBFieldsDto } from './baseDBFields.dto';
import { OrderBaseDto } from './order.base.dto';
import { CustomerItemDto } from './customer.item.dto';
import { UserItemDto } from './user.item.dto';
import { OrderItemItemDto } from './orderItem.item.dto';
declare const OrderItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & OrderBaseDto, typeof BaseDBFieldsDto & typeof OrderBaseDto, false>;
export declare class OrderItemDto extends OrderItemDto_base {
    orderItems?: OrderItemItemDto[];
    customer: CustomerItemDto;
    deliveryUser: UserItemDto;
    orderUser: UserItemDto;
    oldTotalDiscount: number;
    oldTotalSaleAmount: number;
    oldTotalRegularAmount: number;
    totalDiscount: number;
    totalSaleAmount: number;
    totalRegularAmount: number;
    isCompleted?: boolean;
    isDelivered?: boolean;
    deliveryDate?: string | Date;
}
export {};
