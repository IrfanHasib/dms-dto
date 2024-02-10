import { BaseDBFieldsDto } from './baseDBFields.dto';
import { decorate, Mixin } from 'ts-mixer';
import { DeliverySummaryProductBaseDto } from './deliverySummaryProduct.base.dto';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DeliverySummaryProductItemDto extends Mixin(BaseDBFieldsDto, DeliverySummaryProductBaseDto) {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  orderedQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  deliveredQuantity: number;
}
