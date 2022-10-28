import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import {Expose, Type} from 'class-transformer';
import { ConditionCountType } from './../enum/conditionCountType';
import { ConditionOperator } from './../enum/conditionOperator';
import { DiscountConditionType } from './../enum/discountConditionType';

export class DiscountConditionItemDto {
  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsDecimal()
  conditionValue: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ConditionOperator)
  conditionOperator: ConditionOperator;

  @Expose()
  @IsNotEmpty()
  @IsEnum(DiscountConditionType)
  conditionType: DiscountConditionType;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ConditionCountType)
  conditionCountType: ConditionCountType;
}
