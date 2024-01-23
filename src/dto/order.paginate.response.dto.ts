import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { OrderItemDto } from './order.item.dto';

export class OrderPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}
