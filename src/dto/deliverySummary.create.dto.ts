import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DeliverySummaryProductCreateDto } from './deliverySummaryProduct.create.dto';

export class DeliverySummaryCreateDto extends DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DeliverySummaryProductCreateDto))
  deliverySummaryProducts?: DeliverySummaryProductCreateDto[];
}
