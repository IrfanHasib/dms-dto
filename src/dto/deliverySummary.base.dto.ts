import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransformBoolean } from '../utils/transformBoolean';

export class DeliverySummaryBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  comment: string;

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

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isCanceled: boolean;
}
