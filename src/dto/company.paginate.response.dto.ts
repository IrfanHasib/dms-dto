import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { CompanyItemDto } from './company.item.dto';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';

export class CompanyPaginateResponseDto extends PaginateResponseMetadataDto {
  @Expose()
  @IsArray()
  @Type(() => CompanyItemDto)
  @ValidateNested({ each: true })
  items: CompanyItemDto[];
}
