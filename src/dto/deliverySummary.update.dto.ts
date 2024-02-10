import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { DeliverySummaryProductUpdateDto } from './deliverySummaryProduct.update.dto';
import { TransformBoolean } from '../utils/transformBoolean';

export class DeliverySummaryUpdateDto extends DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  deliveryByUserId: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DeliverySummaryProductUpdateDto))
  deliverySummaryProducts?: DeliverySummaryProductUpdateDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsInt({ each: true }))
  @decorate(Type(() => Number))
  deliverySummaryOrderIds?: number[];

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isDispatched: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isReturned: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isCompleted: boolean;
}
