import { BaseDBFieldsDto } from './baseDBFields.dto';
import { OrderBaseDto } from './order.base.dto';
import { CustomerItemDto } from './customer.item.dto';
import { UserItemDto } from './user.item.dto';
import { OrderProductItemDto } from './orderProduct.item.dto';
import { OrderPaymentItemDto } from './orderPayment.item.dto';
import { DeliverySummaryItemDto } from './deliverySummary.item.dto';
declare const OrderItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & OrderBaseDto, typeof BaseDBFieldsDto & typeof OrderBaseDto>;
export declare class OrderItemDto extends OrderItemDto_base {
    orderProducts: OrderProductItemDto[];
    orderPayments: OrderPaymentItemDto[];
    customer?: CustomerItemDto;
    orderUser?: UserItemDto;
    orderUserId?: number;
    deliveryByUserId?: number;
    deliverySummary: DeliverySummaryItemDto;
    deliverySummaryId?: number;
    oldTotalDiscount: number;
    oldTotalSaleAmount: number;
    oldTotalRegularAmount: number;
    totalDiscount: number;
    totalSaleAmount: number;
    totalRegularAmount: number;
    totalPaymentAmount: number;
    totalDueAmount: number;
    isPaid: boolean;
}
export {};
