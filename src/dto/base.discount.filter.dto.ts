import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BaseDiscountNestedItemDto } from './base.discount.nested.item.dto';
import {DiscountFilterType} from "enum/DiscountFilterType";

export class BaseDiscountFilterDto {
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEnum(DiscountFilterType)
  discountFilterType: DiscountFilterType;

  @ValidateIf((o) => o.discountFilterType !== DiscountFilterType.ALL)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isInList: boolean;

  @ValidateIf((o) => o.discountFilterType === DiscountFilterType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  products: BaseDiscountNestedItemDto[];

  @ValidateIf((o) => o.discountFilterType === DiscountFilterType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  companies: BaseDiscountNestedItemDto[];

  @ValidateIf((o) => o.discountFilterType === DiscountFilterType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => BaseDiscountNestedItemDto)
  categories: BaseDiscountNestedItemDto[];
}
