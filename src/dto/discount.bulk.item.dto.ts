import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BulkDiscountType } from '../enum/bulkDiscountType';
import { decorate } from 'ts-mixer';

export class DiscountBulkItemDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  minimumQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  maximumQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(BulkDiscountType))
  discountType: BulkDiscountType;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  discountAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  label: string;
}
