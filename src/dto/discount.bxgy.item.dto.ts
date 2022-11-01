import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { BXGYDiscountType } from '../enum/BXGYDiscountType';
import { BXGYType } from '../enum/BXGYType';
import { decorate } from 'ts-mixer';
import { DiscountBxgyItemItemDto } from './discount.bxgy.item.item.dto';

export class DiscountBxgyItemDto {
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
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  discountAmount?: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  isBXGYRecursive: boolean = false;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(BXGYType))
  BXGYType: BXGYType;

  @decorate(Expose())
  @decorate(ValidateIf(o => !o.isBXGYRecursive))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  maximumQuantity?: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.BXGYType !== BXGYType.ALL))
  @decorate(
    Transform(({ value, obj }) =>
      value?.map((valueObj: any) => {
        valueObj.BXGYType = obj?.BXGYType;
        return valueObj;
      }),
    ),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => DiscountBxgyItemItemDto))
  discountBXGYItemItems: DiscountBxgyItemItemDto[];
}
