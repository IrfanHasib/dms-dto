import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class DeliverySummaryCreateDto extends DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  deliveryByUserId: number;
}
