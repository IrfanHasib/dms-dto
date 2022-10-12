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
import { BaseDiscountNestedItemDto } from './base.discount.nested.item.dto';
import {BXGYDiscountType} from "enum/BXGYDiscountType";
import {BXGYType} from "enum/BXGYType";

export class BaseDiscountBxgyDto {
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

  @ValidateIf((o) => o.discountType !== BXGYDiscountType.FREE)
  @IsDecimal()
  discountAmount: number;

  @IsNotEmpty()
  @IsBoolean()
  isBXGYRecursive: boolean;

  @IsNotEmpty()
  @IsEnum(BXGYType)
  BXGYType: BXGYType;

  @ValidateIf((o) => !o.isBXGYRecursive)
  @IsInt()
  @Type(() => Number)
  maximumQuantity: number;

  @ValidateIf((o) => o.BXGYType === BXGYType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  products: BaseDiscountNestedItemDto[];

  @ValidateIf((o) => o.BXGYType === BXGYType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  companies: BaseDiscountNestedItemDto[];

  @ValidateIf((o) => o.BXGYType === BXGYType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  categories: BaseDiscountNestedItemDto[];
}
