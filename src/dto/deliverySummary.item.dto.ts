import { BaseDBFieldsDto } from './baseDBFields.dto';
import { decorate, Mixin } from 'ts-mixer';
import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { DeliverySummaryProductItemDto } from './deliverySummaryProduct.item.dto';
import { UserItemDto } from './user.item.dto';
import { RouteItemDto } from './route.item.dto';
import { TransformBoolean } from '../utils/transformBoolean';

export class DeliverySummaryItemDto extends Mixin(BaseDBFieldsDto, DeliverySummaryBaseDto) {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsInt({ each: true }))
  @decorate(Type(() => Number))
  ordersIds?: number[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DeliverySummaryProductItemDto))
  deliverySummaryProducts?: DeliverySummaryProductItemDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(Type(() => UserItemDto))
  deliveryByUser: UserItemDto;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(Type(() => RouteItemDto))
  route: RouteItemDto;

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
  isDispatched: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isReturned: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isCompleted: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(TransformBoolean())
  @decorate(IsBoolean())
  isCanceled: boolean;
}
