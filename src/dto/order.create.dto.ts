import { OrderBaseDto } from './order.base.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { OrderProductCreateDto } from './orderProduct.create.dto';
import { OrderPaymentCreateDto } from './orderPayment.create.dto';

export class OrderCreateDto extends OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderProductCreateDto))
  orderProducts?: OrderProductCreateDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderPaymentCreateDto))
  orderPayments?: OrderPaymentCreateDto[];
}
