import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BulkDiscountType } from './../enum/bulkDiscountType';

export class DiscountBulkItemDto {
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
  maximumQuantity: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(BulkDiscountType)
  discountType: BulkDiscountType;

  @Expose()
  @IsNotEmpty()
  @IsDecimal()
  discountAmount: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  label: string;
}
