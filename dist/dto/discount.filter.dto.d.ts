import { DiscountFilterType } from 'enum/DiscountFilterType';
import { DiscountListItemDto } from 'dto/discount.list.item.dto';
export declare class DiscountFilterDto {
    id: number;
    discountFilterType: DiscountFilterType;
    isInList: boolean;
    products: DiscountListItemDto[];
    companies: DiscountListItemDto[];
    categories: DiscountListItemDto[];
}
