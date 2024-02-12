import { BXGXDiscountType } from '../enum/BXGXDiscountType';
export declare class DiscountBxgxItemDto {
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGXDiscountType;
    discountAmount?: number;
    isBXGXRecursive: boolean;
    maximumQuantity?: number;
}
