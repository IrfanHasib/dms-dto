import { OrderBaseDto } from './order.base.dto';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { OrderProductUpdateDto } from './orderProduct.update.dto';
import { OrderPaymentUpdateDto } from './orderPayment.update.dto';

export class OrderUpdateDto extends OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderProductUpdateDto))
  orderProducts?: OrderProductUpdateDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderPaymentUpdateDto))
  orderPayments?: OrderPaymentUpdateDto[];
}
