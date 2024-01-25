import { decorate, Mixin } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDBFieldsDto } from './baseDBFields.dto';
import { OrderPaymentBaseDto } from './orderPayment.base.dto';
import { ProductItemDto } from './product.item.dto';
import { UserItemDto } from './user.item.dto';

export class OrderPaymentItemDto extends Mixin(BaseDBFieldsDto, OrderPaymentBaseDto) {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  id: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @Type(() => UserItemDto)
  collectedByUser: UserItemDto;
}
