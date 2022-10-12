import { BXGXDiscountType } from "enum/BXGXDiscountType";
export declare class BaseDiscountBxgxDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGXDiscountType;
    discountAmount: number;
    isBXGXRecursive: boolean;
    maximumQuantity: number;
}
