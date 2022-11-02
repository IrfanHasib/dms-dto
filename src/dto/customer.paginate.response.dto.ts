import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { CustomerItemDto } from './customer.item.dto';

export class CustomerPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => CustomerItemDto)
  @ValidateNested({ each: true })
  items: CustomerItemDto[];
}
