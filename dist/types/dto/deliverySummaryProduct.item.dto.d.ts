import { BaseDBFieldsDto } from './baseDBFields.dto';
import { DeliverySummaryProductBaseDto } from './deliverySummaryProduct.base.dto';
declare const DeliverySummaryProductItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & DeliverySummaryProductBaseDto, typeof BaseDBFieldsDto & typeof DeliverySummaryProductBaseDto>;
export declare class DeliverySummaryProductItemDto extends DeliverySummaryProductItemDto_base {
    orderedQuantity: number;
    deliveredQuantity: number;
}
export {};
