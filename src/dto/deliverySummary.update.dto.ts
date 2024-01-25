import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DeliverySummaryProductUpdateDto } from './deliverySummaryProduct.update.dto';

export class DeliverySummaryUpdateDto extends DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DeliverySummaryProductUpdateDto))
  deliverySummaryProducts?: DeliverySummaryProductUpdateDto[];
}
