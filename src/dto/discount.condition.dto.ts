import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ConditionCountType } from 'enum/conditionCountType';
import { ConditionOperator } from 'enum/conditionOperator';
import { DiscountConditionType } from 'enum/discountConditionType';

export class DiscountConditionDto {
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDecimal()
  conditionValue: number;

  @IsNotEmpty()
  @IsEnum(ConditionOperator)
  conditionOperator: ConditionOperator;

  @IsNotEmpty()
  @IsEnum(DiscountConditionType)
  conditionType: DiscountConditionType;

  @IsNotEmpty()
  @IsEnum(ConditionCountType)
  conditionCountType: ConditionCountType;
}
