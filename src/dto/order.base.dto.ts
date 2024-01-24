import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { TransformBoolean } from '../utils/transformBoolean';

export class OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  comment: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  customerId: number;
}
