import { OrderItemBaseDto } from './orderItem.base.dto';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { OrderItemType } from '../enum/orderItemType';

export class OrderItemUpsertDto extends OrderItemBaseDto {
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

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  id?: number;
}
