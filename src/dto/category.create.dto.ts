import { CategoryBaseDto } from './category.base.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class CategoryCreateDto extends CategoryBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  companyId: number;
}
