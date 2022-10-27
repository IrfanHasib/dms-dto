import 'reflect-metadata';
import { DiscountFilterType } from './../enum/DiscountFilterType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';
export declare class DiscountFilterItemDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    products: AutoCompleteOptionItemDto[];
    companies: AutoCompleteOptionItemDto[];
    categories: AutoCompleteOptionItemDto[];
}
