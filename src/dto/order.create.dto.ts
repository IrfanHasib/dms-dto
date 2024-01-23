import { OrderBaseDto } from './order.base.dto';
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { OrderItemUpsertDto } from './orderItem.upsert.dto';

export class OrderCreateDto extends OrderBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  customerId: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderItemUpsertDto))
  orderItems?: OrderItemUpsertDto[];
}
