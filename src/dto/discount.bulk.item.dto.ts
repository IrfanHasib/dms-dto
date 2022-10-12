import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { BulkDiscountType } from './../enum/bulkDiscountType';

export class DiscountBulkItemDto {
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
  maximumQuantity: number;

  @IsNotEmpty()
  @IsEnum(BulkDiscountType)
  discountType: BulkDiscountType;

  @IsNotEmpty()
  @IsDecimal()
  discountAmount: number;

  @IsNotEmpty()
  @IsString()
  label: string;
}
