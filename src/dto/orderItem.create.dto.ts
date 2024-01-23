import { OrderItemBaseDto } from './orderItem.base.dto';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { OrderItemType } from '../enum/orderItemType';

export class OrderItemCreateDto extends OrderItemBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  productId: number;

  @decorate(Expose())
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(OrderItemType))
  itemType: OrderItemType;
}
