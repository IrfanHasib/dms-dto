import { BaseDBFieldsDto } from './baseDBFields.dto';
import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { DeliverySummaryProductItemDto } from './deliverySummaryProduct.item.dto';
import { UserItemDto } from './user.item.dto';
import { RouteItemDto } from './route.item.dto';
declare const DeliverySummaryItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & DeliverySummaryBaseDto, typeof BaseDBFieldsDto & typeof DeliverySummaryBaseDto>;
export declare class DeliverySummaryItemDto extends DeliverySummaryItemDto_base {
    ordersIds?: number[];
    deliverySummaryProducts?: DeliverySummaryProductItemDto[];
    deliveryByUser: UserItemDto;
    route: RouteItemDto;
    totalDiscount: number;
    totalSaleAmount: number;
    totalRegularAmount: number;
    isDispatched: boolean;
    isReturned: boolean;
    isCompleted: boolean;
    isCanceled: boolean;
}
export {};
