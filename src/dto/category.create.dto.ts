import { CategoryBaseDto } from './category.base.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CategoryCreateDto extends CategoryBaseDto {
  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  companyId: number;
}
