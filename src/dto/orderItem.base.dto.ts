import { decorate } from 'ts-mixer';
import { IsIn, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class OrderItemBaseDto {
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
}
