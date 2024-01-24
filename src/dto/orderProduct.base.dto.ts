import { decorate } from 'ts-mixer';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class OrderProductBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  sale_price: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  quantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;
}
