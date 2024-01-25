import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { DeliverySummaryItemDto } from './deliverySummary.item.dto';

export class DeliverySummaryPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => DeliverySummaryItemDto)
  @ValidateNested({ each: true })
  items: DeliverySummaryItemDto[];
}
