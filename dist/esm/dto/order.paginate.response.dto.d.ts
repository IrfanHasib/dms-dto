import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { OrderItemDto } from './order.item.dto';
export declare class OrderPaginateResponseDto extends PaginateResponseMetadataDto {
    items: OrderItemDto[];
}
