import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  comment: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  deliveryByUserId: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  routeId: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Date))
  @decorate(IsDate())
  deliveryDate: string | Date;
}
