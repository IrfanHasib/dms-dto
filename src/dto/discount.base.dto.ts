import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BulkAdjustmentCountType } from './../enum/bulkAdjustmentCountType';
import { CartAdjustmentDiscountType } from './../enum/cartAdjustmentDiscountType';
import { DiscountType } from './../enum/DiscountType';
import { ProductAdjustmentDiscountType } from './../enum/ProductAdjustmentDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { BXGYCountType } from './../enum/BXGYCountType';
import { BXGYGetType } from './../enum/BXGYGetType';
import { DiscountBulkItemDto } from './../dto/discount.bulk.item.dto';
import { DiscountBxgyItemDto } from './../dto/discount.bxgy.item.dto';
import { DiscountBxgxItemDto } from './../dto/discount.bxgx.item.dto';
import { DiscountFilterItemDto } from './../dto/discount.filter.item.dto';
import { DiscountConditionItemDto } from './../dto/discount.condition.item.dto';
import 'reflect-metadata';

export class DiscountBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isEnabled: boolean;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isIgnoreOther: boolean;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isIgnoreThisIfOtherMatched: boolean;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  priority: number;

  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  usageLimit: number;

  //DiscountType.PRODUCT_ADJUSTMENT
  @ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT)
  @IsEnum(ProductAdjustmentDiscountType)
  productAdjustmentDiscountType: ProductAdjustmentDiscountType;

  @ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT)
  @IsDecimal()
  productAdjustmentDiscountAmount: number;

  //DiscountType.CART_ADJUSTMENT
  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsEnum(CartAdjustmentDiscountType)
  cartAdjustmentDiscountType: CartAdjustmentDiscountType;

  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsDecimal()
  cartAdjustmentDiscountAmount: number;

  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsString()
  cartAdjustmentLabel: string;

  //DiscountType.BULK_ADJUSTMENT
  @ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT)
  @IsEnum(BulkAdjustmentCountType)
  bulkAdjustmentCountType: BulkAdjustmentCountType;

  @ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountBulkItemDto)
  discountBulks: DiscountBulkItemDto[];

  //DiscountType.BXGX
  @ValidateIf(o => o.discountType === DiscountType.BXGX)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isBXGXRecursive: boolean;

  @ValidateIf(o => o.discountType === DiscountType.BXGX)
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value, obj }) =>
    value
      ?.filter((_valueObj: any, index: number) => !obj?.isBXGXRecursive || index < 1)
      ?.map((valueObj: any) => {
        valueObj.isBXGXRecursive = obj?.isBXGXRecursive;
        return valueObj;
      }),
  )
  @Type(() => DiscountBxgxItemDto)
  @ValidateNested({ each: true })
  discountBXGXs: DiscountBxgxItemDto[];

  //DiscountType.BXGY
  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYType)
  BXGYType: BXGYType;

  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYCountType)
  BXGYCountType: BXGYCountType;

  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYGetType)
  BXGYGetType: BXGYGetType;

  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isBXGYRecursive: boolean;

  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value, obj }) =>
    value
      ?.filter((_valueObj: any, index: number) => !obj?.isBXGYRecursive || index < 1)
      ?.map((valueObj: any) => {
        valueObj.BXGYType = obj?.BXGYType;
        valueObj.isBXGYRecursive = obj?.isBXGYRecursive;
        return valueObj;
      }),
  )
  @Type(() => DiscountBxgyItemDto)
  @ValidateNested({ each: true })
  discountBXGYs: DiscountBxgyItemDto[];

  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsDateString()
  activeFromDateTime: Date;

  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsDateString()
  activeToDateTime: Date;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isMatchAllCondition: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountFilterItemDto)
  discountFilers: DiscountFilterItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => DiscountConditionItemDto)
  discountConditions: DiscountConditionItemDto[];
}
