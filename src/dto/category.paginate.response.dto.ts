import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { CategoryItemDto } from './category.item.dto';

export class CategoryPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => CategoryItemDto)
  @ValidateNested({ each: true })
  items: CategoryItemDto[];
}
