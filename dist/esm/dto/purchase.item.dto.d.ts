import { BaseDBFieldsDto } from './baseDBFields.dto';
import { PurchaseBaseDto } from './purchase.base.dto';
declare const PurchaseItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & PurchaseBaseDto, typeof BaseDBFieldsDto & typeof PurchaseBaseDto>;
export declare class PurchaseItemDto extends PurchaseItemDto_base {
    userId: number;
    totalAmount: number;
}
export {};
