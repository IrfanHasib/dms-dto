import { BaseDiscountNestedItemDto } from './base.discount.nested.item.dto';
import { DiscountFilterType } from "enum/DiscountFilterType";
export declare class BaseDiscountFilterDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    products: BaseDiscountNestedItemDto[];
    companies: BaseDiscountNestedItemDto[];
    categories: BaseDiscountNestedItemDto[];
}
