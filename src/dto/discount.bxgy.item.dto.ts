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
import { BXGYDiscountType } from '../enum/BXGYDiscountType';
import { BXGYType } from '../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './autoComplete.option.item.dto';
import { decorate } from 'ts-mixer';

export class DiscountBxgyItemDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  minimumQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  bonusQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(BXGYDiscountType))
  discountType: BXGYDiscountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType !== BXGYDiscountType.FREE))
  @decorate(IsDecimal())
  discountAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  isBXGYRecursive: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(BXGYType))
  BXGYType: BXGYType;

  @decorate(Expose())
  @decorate(ValidateIf(o => !o.isBXGYRecursive))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  maximumQuantity: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.PRODUCTS))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  products: AutoCompleteOptionItemDto[];

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.COMPANIES))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  companies: AutoCompleteOptionItemDto[];

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  categories: AutoCompleteOptionItemDto[];
}
