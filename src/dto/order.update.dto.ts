import { OrderBaseDto } from './order.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { OrderItemUpdateDto } from './orderItem.update.dto';

export class OrderUpdateDto extends OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderItemUpdateDto))
  orderItems?: OrderItemUpdateDto[];
}
