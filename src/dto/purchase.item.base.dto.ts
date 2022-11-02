import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min, ValidateIf } from 'class-validator';

export class PurchaseItemBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  cost: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  @decorate(Min(1))
  quantity: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalAmount?: number;
}
