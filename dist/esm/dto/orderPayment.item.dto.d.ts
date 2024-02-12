import { BaseDBFieldsDto } from './baseDBFields.dto';
import { OrderPaymentBaseDto } from './orderPayment.base.dto';
import { UserItemDto } from './user.item.dto';
declare const OrderPaymentItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & OrderPaymentBaseDto, typeof BaseDBFieldsDto & typeof OrderPaymentBaseDto>;
export declare class OrderPaymentItemDto extends OrderPaymentItemDto_base {
    id: number;
    collectedByUser: UserItemDto;
}
export {};
