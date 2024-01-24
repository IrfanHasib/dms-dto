import { IsInt, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { OrderItemCreateDto } from './orderItem.create.dto';

export class OrderItemUpdateDto extends OrderItemCreateDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  id?: number;
}
