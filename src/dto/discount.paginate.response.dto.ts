import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { DiscountItemDto } from './discount.item.dto';

export class DiscountPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => DiscountItemDto)
  @ValidateNested({ each: true })
  items: DiscountItemDto[];
}
