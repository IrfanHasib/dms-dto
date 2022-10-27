import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyItemDto } from './../dto/company.item.dto';
import { PaginateResponseMetadataDto } from './../dto/paginate.response.metadata.dto';

export class CompanyPaginateResponseDto extends PaginateResponseMetadataDto {
  @IsArray()
  @Type(() => CompanyItemDto)
  @ValidateNested({ each: true })
  items: CompanyItemDto[];
}
