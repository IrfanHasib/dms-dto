import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
import { ProductItemDto } from './product.item.dto';

export class ProductPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => ProductItemDto)
  @ValidateNested({ each: true })
  items: ProductItemDto[];
}
