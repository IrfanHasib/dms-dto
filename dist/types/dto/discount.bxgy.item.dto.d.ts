import { BXGYDiscountType } from '../enum/BXGYDiscountType';
import { BXGYType } from '../enum/BXGYType';
import { DiscountBxgyItemItemDto } from './discount.bxgy.item.item.dto';
export declare class DiscountBxgyItemDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGYDiscountType;
    discountAmount: number;
    isBXGYRecursive: boolean;
    BXGYType: BXGYType;
    maximumQuantity: number;
    discountBXGYItemItems: DiscountBxgyItemItemDto[];
}
