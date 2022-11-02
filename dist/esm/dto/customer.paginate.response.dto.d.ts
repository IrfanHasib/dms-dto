import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { CustomerItemDto } from './customer.item.dto';
export declare class CustomerPaginateResponseDto extends PaginateResponseMetadataDto {
    items: CustomerItemDto[];
}
