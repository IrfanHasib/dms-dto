import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ConditionCountType } from '../enum/conditionCountType';
import { ConditionOperator } from '../enum/conditionOperator';
import { DiscountConditionType } from '../enum/discountConditionType';
import { decorate } from 'ts-mixer';

export class DiscountConditionItemDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  conditionValue: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(ConditionOperator))
  conditionOperator: ConditionOperator;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(DiscountConditionType))
  conditionType: DiscountConditionType;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(ConditionCountType))
  conditionCountType: ConditionCountType;
}
