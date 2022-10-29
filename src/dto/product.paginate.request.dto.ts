import { IsInt, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginateRequestDto } from './paginate.request.dto';

export class ProductPaginateRequestDto extends PaginateRequestDto {
  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsInt()
  companyId?: number;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
}
