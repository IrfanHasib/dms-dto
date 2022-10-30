import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class BaseDBFieldsDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsBoolean())
  isDeleted: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsDate())
  @decorate(Type(() => Date))
  createdAt: Date;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsDate())
  @decorate(Type(() => Date))
  updatedAt: Date;
}
