import { OrderBaseDto } from './order.base.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { OrderProductUpdateDto } from './orderProduct.update.dto';

export class OrderCreateDto extends OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => OrderProductUpdateDto))
  orderProducts?: OrderProductUpdateDto[];
}
