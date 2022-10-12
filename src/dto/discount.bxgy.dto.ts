import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BXGYDiscountType } from 'enum/BXGYDiscountType';
import { BXGYType } from 'enum/BXGYType';
import { DiscountListItemDto } from 'dto/discount.list.item.dto';

export class DiscountBxgyDto {
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
  @IsEnum(BXGYDiscountType)
  discountType: BXGYDiscountType;

  @ValidateIf(o => o.discountType !== BXGYDiscountType.FREE)
  @IsDecimal()
  discountAmount: number;

  @IsNotEmpty()
  @IsBoolean()
  isBXGYRecursive: boolean;

  @IsNotEmpty()
  @IsEnum(BXGYType)
  BXGYType: BXGYType;

  @ValidateIf(o => !o.isBXGYRecursive)
  @IsInt()
  @Type(() => Number)
  maximumQuantity: number;

  @ValidateIf(o => o.BXGYType === BXGYType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  products: DiscountListItemDto[];

  @ValidateIf(o => o.BXGYType === BXGYType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  companies: DiscountListItemDto[];

  @ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  categories: DiscountListItemDto[];
}