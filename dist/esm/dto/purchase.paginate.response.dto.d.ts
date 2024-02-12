import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { PurchaseItemDto } from './purchase.item.dto';
export declare class PurchasePaginateResponseDto extends PaginateResponseMetadataDto {
    items: PurchaseItemDto[];
}
