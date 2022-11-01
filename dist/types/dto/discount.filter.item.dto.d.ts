import { DiscountFilterType } from '../enum/discountFilterType';
import { DiscountFilterItemItemDto } from './discount.filter.item.item.dto';
export declare class DiscountFilterItemDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    discountFilterItemItems: DiscountFilterItemItemDto[];
}
