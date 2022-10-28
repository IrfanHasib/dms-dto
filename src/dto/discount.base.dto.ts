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
import { Expose, Transform, Type } from 'class-transformer';
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

export class DiscountBaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isEnabled: boolean;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isIgnoreOther: boolean;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isIgnoreThisIfOtherMatched: boolean;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  priority: number;

  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  usageLimit: number;

  //DiscountType.PRODUCT_ADJUSTMENT
  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT)
  @IsEnum(ProductAdjustmentDiscountType)
  productAdjustmentDiscountType: ProductAdjustmentDiscountType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.PRODUCT_ADJUSTMENT)
  @IsDecimal()
  productAdjustmentDiscountAmount: number;

  //DiscountType.CART_ADJUSTMENT
  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsEnum(CartAdjustmentDiscountType)
  cartAdjustmentDiscountType: CartAdjustmentDiscountType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsDecimal()
  cartAdjustmentDiscountAmount: number;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.CART_ADJUSTMENT)
  @IsString()
  cartAdjustmentLabel: string;

  //DiscountType.BULK_ADJUSTMENT
  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT)
  @IsEnum(BulkAdjustmentCountType)
  bulkAdjustmentCountType: BulkAdjustmentCountType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BULK_ADJUSTMENT)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountBulkItemDto)
  discountBulks: DiscountBulkItemDto[];

  //DiscountType.BXGX
  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BXGX)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isBXGXRecursive: boolean;

  @Expose()
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
  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYType)
  BXGYType: BXGYType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYCountType)
  BXGYCountType: BXGYCountType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @IsEnum(BXGYGetType)
  BXGYGetType: BXGYGetType;

  @Expose()
  @ValidateIf(o => o.discountType === DiscountType.BXGY)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isBXGYRecursive: boolean;

  @Expose()
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

  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsDateString()
  activeFromDateTime: Date;

  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @IsDateString()
  activeToDateTime: Date;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isMatchAllCondition: boolean;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountFilterItemDto)
  discountFilers: DiscountFilterItemDto[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => DiscountConditionItemDto)
  discountConditions: DiscountConditionItemDto[];
}
