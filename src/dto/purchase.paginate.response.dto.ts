import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { PurchaseItemDto } from './purchase.item.dto';

export class PurchasePaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => PurchaseItemDto)
  @ValidateNested({ each: true })
  items: PurchaseItemDto[];
}
