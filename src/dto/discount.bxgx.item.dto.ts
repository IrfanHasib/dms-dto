import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BXGXDiscountType } from '../enum/BXGXDiscountType';
import { decorate } from 'ts-mixer';

export class DiscountBxgxItemDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  minimumQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  bonusQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(BXGXDiscountType))
  discountType: BXGXDiscountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType !== BXGXDiscountType.FREE))
  @decorate(IsDecimal())
  discountAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  isBXGXRecursive: boolean;

  @decorate(Expose())
  @decorate(ValidateIf(o => !o.isBXGXRecursive))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  maximumQuantity: number;
}
