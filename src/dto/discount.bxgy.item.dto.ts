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
import { Expose, Type } from 'class-transformer';
import { BXGYDiscountType } from './../enum/BXGYDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';

export class DiscountBxgyItemDto {
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
  @IsEnum(BXGYDiscountType)
  discountType: BXGYDiscountType;

  @Expose()
  @ValidateIf(o => o.discountType !== BXGYDiscountType.FREE)
  @IsDecimal()
  discountAmount: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isBXGYRecursive: boolean;

  @Expose()
  @IsNotEmpty()
  @IsEnum(BXGYType)
  BXGYType: BXGYType;

  @Expose()
  @ValidateIf(o => !o.isBXGYRecursive)
  @IsInt()
  @Type(() => Number)
  maximumQuantity: number;

  @Expose()
  @ValidateIf(o => o.BXGYType === BXGYType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  products: AutoCompleteOptionItemDto[];

  @Expose()
  @ValidateIf(o => o.BXGYType === BXGYType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  companies: AutoCompleteOptionItemDto[];

  @Expose()
  @ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  categories: AutoCompleteOptionItemDto[];
}
