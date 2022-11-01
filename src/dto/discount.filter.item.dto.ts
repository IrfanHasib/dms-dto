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
import { decorate } from 'ts-mixer';
import { DiscountFilterItemItemDto } from './discount.filter.item.item.dto';

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
  @decorate(ValidateIf(o => o.discountFilterType !== DiscountFilterType.ALL))
  @decorate(
    Transform(({ value, obj }) =>
      value?.map((valueObj: any) => {
        valueObj.discountFilterType = obj?.discountFilterType;
        return valueObj;
      }),
    ),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => DiscountFilterItemItemDto))
  discountFilterItemItems: DiscountFilterItemItemDto[];
}
