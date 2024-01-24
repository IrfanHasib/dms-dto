import { OrderProductBaseDto } from './orderProduct.base.dto';
import { decorate, Mixin } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItemType } from '../enum/orderItemType';
import { BaseDBFieldsDto } from './baseDBFields.dto';
import { ProductItemDto } from './product.item.dto';

export class OrderProductItemDto extends Mixin(BaseDBFieldsDto, OrderProductBaseDto) {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @Type(() => ProductItemDto)
  product: ProductItemDto;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(OrderItemType))
  itemType: OrderItemType;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  cost: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  regular_price: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  sale_price: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  mrp: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  quantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalRegularAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalSaleAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  totalDiscount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  oldQuantity: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalRegularAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalSaleAmount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(Type(() => Number))
  oldTotalDiscount: number;
}
