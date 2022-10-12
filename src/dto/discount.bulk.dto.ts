import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { BulkDiscountType } from 'enum/bulkDiscountType';

export class DiscountBulkDto {
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
