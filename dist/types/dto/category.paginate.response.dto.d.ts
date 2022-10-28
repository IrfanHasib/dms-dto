import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { CategoryItemDto } from './category.item.dto';
export declare class CategoryPaginateResponseDto extends PaginateResponseMetadataDto {
    items: CategoryItemDto[];
}
