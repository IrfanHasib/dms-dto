import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { DiscountFilterType } from '../enum/discountFilterType';
import { AutoCompleteOptionItemDto } from './autoComplete.option.item.dto';
import { decorate } from 'ts-mixer';

export class DiscountFilterItemDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(DiscountFilterType))
  discountFilterType: DiscountFilterType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType !== DiscountFilterType.ALL))
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isInList: boolean;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.PRODUCTS))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  products: AutoCompleteOptionItemDto[];

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.COMPANIES))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  companies: AutoCompleteOptionItemDto[];

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountFilterType === DiscountFilterType.CATEGORIES))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => AutoCompleteOptionItemDto))
  categories: AutoCompleteOptionItemDto[];
}
