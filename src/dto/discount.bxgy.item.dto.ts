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
import { BXGYDiscountType } from './../enum/BXGYDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';

export class DiscountBxgyItemDto {
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
  @Type(() => AutoCompleteOptionItemDto)
  products: AutoCompleteOptionItemDto[];

  @ValidateIf(o => o.BXGYType === BXGYType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  companies: AutoCompleteOptionItemDto[];

  @ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  categories: AutoCompleteOptionItemDto[];
}
