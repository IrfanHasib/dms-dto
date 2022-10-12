import { BaseDiscountNestedItemDto } from './base.discount.nested.item.dto';
import { BXGYDiscountType } from "enum/BXGYDiscountType";
import { BXGYType } from "enum/BXGYType";
export declare class BaseDiscountBxgyDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGYDiscountType;
    discountAmount: number;
    isBXGYRecursive: boolean;
    BXGYType: BXGYType;
    maximumQuantity: number;
    products: BaseDiscountNestedItemDto[];
    companies: BaseDiscountNestedItemDto[];
    categories: BaseDiscountNestedItemDto[];
}
