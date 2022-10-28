import { IsInt, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateRequestDto } from './paginate.request.dto';

export class CategoryPaginateRequestDto extends PaginateRequestDto {
  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  companyId?: number;
}
