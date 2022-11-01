import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { DiscountItemDto } from './discount.item.dto';
export declare class DiscountPaginateResponseDto extends PaginateResponseMetadataDto {
    items: DiscountItemDto[];
}
