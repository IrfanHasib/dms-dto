import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class ProductBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  name: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  barcode: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  @decorate(Min(0))
  cost: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  price: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Min(0))
  mrp: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  description: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  order: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  categoryId?: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  companyId?: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  image?: string;
}
