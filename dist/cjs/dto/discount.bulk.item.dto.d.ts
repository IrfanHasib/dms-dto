import { BulkDiscountType } from './../enum/bulkDiscountType';
export declare class DiscountBulkItemDto {
    id: number;
    minimumQuantity: number;
    maximumQuantity: number;
    discountType: BulkDiscountType;
    discountAmount: number;
    label: string;
}
