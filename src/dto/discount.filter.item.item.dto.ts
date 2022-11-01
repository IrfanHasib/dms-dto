import { IsInt, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { DiscountFilterType } from '../enum/discountFilterType';
import { decorate } from 'ts-mixer';

export class DiscountFilterItemItemDto {
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.PRODUCTS))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.COMPANIES))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  companyId: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.CATEGORIES))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  categoryId: number;
}
