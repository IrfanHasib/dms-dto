import { IsInt, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose, Type } from 'class-transformer';
import { OrderPaymentBaseDto } from './orderPayment.base.dto';

export class OrderPaymentUpdateDto extends OrderPaymentBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  id?: number;
}
