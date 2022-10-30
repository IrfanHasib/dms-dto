import { DiscountFilterType } from '../enum/discountFilterType';
import { AutoCompleteOptionItemDto } from './autoComplete.option.item.dto';
export declare class DiscountFilterItemDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    products: AutoCompleteOptionItemDto[];
    companies: AutoCompleteOptionItemDto[];
    categories: AutoCompleteOptionItemDto[];
}
