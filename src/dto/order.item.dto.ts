import { BaseDBFieldsDto } from './baseDBFields.dto';
import { decorate, Mixin } from 'ts-mixer';
import { OrderBaseDto } from './order.base.dto';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CustomerItemDto } from './customer.item.dto';
import { TransformBoolean } from '../utils/transformBoolean';
import { UserItemDto } from './user.item.dto';
import { OrderProductItemDto } from './orderProduct.item.dto';

export class OrderItemDto extends Mixin(BaseDBFieldsDto, OrderBaseDto) {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderProductItemDto))
  orderItems?: OrderProductItemDto[];

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => CustomerItemDto))
  customer: CustomerItemDto;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => UserItemDto))
  orderUser: UserItemDto;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalDiscount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalSaleAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalRegularAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalDiscount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalSaleAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalRegularAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isCanceled: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isDelivered: boolean;
}
