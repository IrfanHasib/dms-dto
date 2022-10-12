import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import {BXGXDiscountType} from "enum/BXGXDiscountType";

export class BaseDiscountBxgxDto {
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  minimumQuantity: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  bonusQuantity: number;

  @IsNotEmpty()
  @IsEnum(BXGXDiscountType)
  discountType: BXGXDiscountType;

  @ValidateIf((o) => o.discountType !== BXGXDiscountType.FREE)
  @IsDecimal()
  discountAmount: number;

  @IsNotEmpty()
  @IsBoolean()
  isBXGXRecursive: boolean;

  @ValidateIf((o) => !o.isBXGXRecursive)
  @IsInt()
  @Type(() => Number)
  maximumQuantity: number;
}
