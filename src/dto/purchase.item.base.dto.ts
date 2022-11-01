import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import {IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf} from 'class-validator';

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
  cost: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  quantity: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalAmount?: number;
}
