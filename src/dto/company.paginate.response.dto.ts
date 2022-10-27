import 'reflect-metadata';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginateMetadataDto } from './../dto/paginate.metadata.dto';
import { CompanyItemDto } from './../dto/company.item.dto';

export class CompanyPaginateResponseDt extends PaginateMetadataDto {
  @IsArray()
  @Type(() => CompanyItemDto)
  @ValidateNested({ each: true })
  items: CompanyItemDto[];
}
