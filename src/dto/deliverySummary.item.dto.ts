import { BaseDBFieldsDto } from './baseDBFields.dto';
import { decorate, Mixin } from 'ts-mixer';
import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DeliverySummaryProductItemDto } from './deliverySummaryProduct.item.dto';

export class DeliverySummaryItemDto extends Mixin(BaseDBFieldsDto, DeliverySummaryBaseDto) {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DeliverySummaryProductItemDto))
  deliverySummaryProducts?: DeliverySummaryProductItemDto[];
}
