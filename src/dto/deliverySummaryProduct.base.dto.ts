import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DeliverySummaryProductBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  dispatchedQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  returnedQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;
}
