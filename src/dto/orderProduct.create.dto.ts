import { OrderProductBaseDto } from './orderProduct.base.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose } from 'class-transformer';
import { OrderItemType } from '../enum/orderItemType';

export class OrderProductCreateDto extends OrderProductBaseDto {
  @decorate(Expose())
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(OrderItemType))
  itemType: OrderItemType;
}
