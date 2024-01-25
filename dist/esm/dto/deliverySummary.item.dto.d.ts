import { BaseDBFieldsDto } from './baseDBFields.dto';
import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { DeliverySummaryProductItemDto } from './deliverySummaryProduct.item.dto';
declare const DeliverySummaryItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & DeliverySummaryBaseDto, typeof BaseDBFieldsDto & typeof DeliverySummaryBaseDto, false>;
export declare class DeliverySummaryItemDto extends DeliverySummaryItemDto_base {
    deliverySummaryProducts?: DeliverySummaryProductItemDto[];
}
export {};
