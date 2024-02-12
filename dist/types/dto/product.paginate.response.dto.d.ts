import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { ProductItemDto } from './product.item.dto';
export declare class ProductPaginateResponseDto extends PaginateResponseMetadataDto {
    items: ProductItemDto[];
}
