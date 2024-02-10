import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { RouteItemDto } from './route.item.dto';

export class RoutePaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => RouteItemDto)
  @ValidateNested({ each: true })
  items: RouteItemDto[];
}
