import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { PurchaseItemBaseDto } from './purchase.item.base.dto';

export class PurchaseBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  title: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  invoiceNumber: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  invoiceImage: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  comment: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isDraft: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsInt())
  @decorate(Type(() => Number))
  companyId: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ArrayMinSize(1))
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => PurchaseItemBaseDto))
  purchaseItems: PurchaseItemBaseDto[];
}
