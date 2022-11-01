import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { BulkAdjustmentCountType } from '../enum/bulkAdjustmentCountType';
import { CartAdjustmentDiscountType } from '../enum/cartAdjustmentDiscountType';
import { DiscountType } from '../enum/discountType';
import { ProductAdjustmentDiscountType } from '../enum/productAdjustmentDiscountType';
import { BXGYType } from '../enum/BXGYType';
import { BXGYCountType } from '../enum/BXGYCountType';
import { BXGYGetType } from '../enum/BXGYGetType';
import { DiscountBulkItemDto } from './discount.bulk.item.dto';
import { DiscountBxgyItemDto } from './discount.bxgy.item.dto';
import { DiscountBxgxItemDto } from './discount.bxgx.item.dto';
import { DiscountFilterItemDto } from './discount.filter.item.dto';
import { DiscountConditionItemDto } from './discount.condition.item.dto';
import { decorate } from 'ts-mixer';

export class DiscountBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  name: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsEnum(DiscountType))
  discountType: DiscountType;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isEnabled: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isIgnoreOther: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isIgnoreThisIfOtherMatched: boolean;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Number))
  @decorate(IsInt())
  priority: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(IsInt())
  @decorate(Type(() => Number))
  usageLimit: number;

  //DiscountType.PRODUCT_ADJUSTMENT
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT))
  @decorate(IsEnum(ProductAdjustmentDiscountType))
  productAdjustmentDiscountType: ProductAdjustmentDiscountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  productAdjustmentDiscountAmount: number;

  //DiscountType.CART_ADJUSTMENT
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT))
  @decorate(IsEnum(CartAdjustmentDiscountType))
  cartAdjustmentDiscountType: CartAdjustmentDiscountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  cartAdjustmentDiscountAmount: number;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT))
  @decorate(IsString())
  cartAdjustmentLabel: string;

  //DiscountType.BULK_ADJUSTMENT
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT))
  @decorate(IsEnum(BulkAdjustmentCountType))
  bulkAdjustmentCountType: BulkAdjustmentCountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => DiscountBulkItemDto))
  discountBulkItems: DiscountBulkItemDto[];

  //DiscountType.BXGX
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGX))
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isBXGXRecursive: boolean;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGX))
  @decorate(IsArray())
  @decorate(ArrayMinSize(1))
  @decorate(
    Transform(({ value, obj }) =>
      value
        ?.filter((_valueObj: any, index: number) => !obj?.isBXGXRecursive || index < 1)
        ?.map((valueObj: any) => {
          valueObj.isBXGXRecursive = obj?.isBXGXRecursive;
          return valueObj;
        }),
    ),
  )
  @decorate(Type(() => DiscountBxgxItemDto))
  @decorate(ValidateNested({ each: true }))
  discountBXGXItems: DiscountBxgxItemDto[];

  //DiscountType.BXGY
  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGY))
  @decorate(IsEnum(BXGYType))
  BXGYType: BXGYType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGY))
  @decorate(IsEnum(BXGYCountType))
  BXGYCountType: BXGYCountType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGY))
  @decorate(IsEnum(BXGYGetType))
  BXGYGetType: BXGYGetType;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGY))
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isBXGYRecursive: boolean;

  @decorate(Expose())
  @decorate(ValidateIf(o => o.discountType === DiscountType.BXGY))
  @decorate(IsArray())
  @decorate(ArrayMinSize(1))
  @decorate(
    Transform(({ value, obj }) =>
      value
        ?.filter((_valueObj: any, index: number) => !obj?.isBXGYRecursive || index < 1)
        ?.map((valueObj: any) => {
          valueObj.BXGYType = obj?.BXGYType;
          valueObj.isBXGYRecursive = obj?.isBXGYRecursive;
          return valueObj;
        }),
    ),
  )
  @decorate(Type(() => DiscountBxgyItemDto))
  @decorate(ValidateNested({ each: true }))
  discountBXGYItems: DiscountBxgyItemDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(IsDateString())
  activeFromDateTime: Date;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((_object, value) => !!value))
  @decorate(IsDateString())
  activeToDateTime: Date;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(
    Transform(({ value }) => {
      return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    }),
  )
  isMatchAllCondition: boolean;

  @decorate(Expose())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(ArrayMinSize(1))
  @decorate(Type(() => DiscountFilterItemDto))
  discountFilterItems: DiscountFilterItemDto[];

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => DiscountConditionItemDto))
  discountConditionItems: DiscountConditionItemDto[];
}
