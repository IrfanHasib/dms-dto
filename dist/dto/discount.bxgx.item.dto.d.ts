import "reflect-metadata";
import { BXGXDiscountType } from './../enum/BXGXDiscountType';
export declare class DiscountBxgxItemDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGXDiscountType;
    discountAmount: number;
    isBXGXRecursive: boolean;
    maximumQuantity: number;
}
