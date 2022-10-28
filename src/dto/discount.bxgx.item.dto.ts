import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BXGXDiscountType } from './../enum/BXGXDiscountType';

export class DiscountBxgxItemDto {
  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  minimumQuantity: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  bonusQuantity: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(BXGXDiscountType)
  discountType: BXGXDiscountType;

  @Expose()
  @ValidateIf(o => o.discountType !== BXGXDiscountType.FREE)
  @IsDecimal()
  discountAmount: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isBXGXRecursive: boolean;

  @Expose()
  @ValidateIf(o => !o.isBXGXRecursive)
  @IsInt()
  @Type(() => Number)
  maximumQuantity: number;
}
