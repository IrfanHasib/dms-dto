import { DiscountFilterType } from 'enum/discountFilterType';
import { DiscountListItemDto } from 'dto/discount.list.item.dto';
export declare class DiscountFilterItemDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    products: DiscountListItemDto[];
    companies: DiscountListItemDto[];
    categories: DiscountListItemDto[];
}
