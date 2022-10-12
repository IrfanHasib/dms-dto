import { BXGYDiscountType } from 'enum/BXGYDiscountType';
import { BXGYType } from 'enum/BXGYType';
import { DiscountListItemDto } from 'dto/discount.list.item.dto';
export declare class DiscountBxgyDto {
    id: number;
    minimumQuantity: number;
    bonusQuantity: number;
    discountType: BXGYDiscountType;
    discountAmount: number;
    isBXGYRecursive: boolean;
    BXGYType: BXGYType;
    maximumQuantity: number;
    products: DiscountListItemDto[];
    companies: DiscountListItemDto[];
    categories: DiscountListItemDto[];
}
