import { BulkDiscountType } from 'enum/bulkDiscountType';
export declare class DiscountBulkDto {
    id: number;
    minimumQuantity: number;
    maximumQuantity: number;
    discountType: BulkDiscountType;
    discountAmount: number;
    label: string;
}
