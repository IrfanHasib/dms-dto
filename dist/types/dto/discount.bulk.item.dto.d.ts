import { BulkDiscountType } from '../enum/bulkDiscountType';
export declare class DiscountBulkItemDto {
    minimumQuantity: number;
    maximumQuantity: number;
    discountType: BulkDiscountType;
    discountAmount: number;
    label: string;
}
