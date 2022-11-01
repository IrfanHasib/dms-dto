import { IsInt, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { BXGYType } from '../enum/BXGYType';

export class DiscountBxgyItemItemDto {
  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.PRODUCTS))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.COMPANIES))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  companyId: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  categoryId: number;
}
