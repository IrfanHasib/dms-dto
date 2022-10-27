import { BXGYDiscountType } from './../enum/BXGYDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';
export declare class DiscountBxgyItemDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGYDiscountType;
    discountAmount: number;
    isBXGYRecursive: boolean;
    BXGYType: BXGYType;
    maximumQuantity: number;
    products: AutoCompleteOptionItemDto[];
    companies: AutoCompleteOptionItemDto[];
    categories: AutoCompleteOptionItemDto[];
}
