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
import { DiscountFilterType } from 'enum/DiscountFilterType';
import { DiscountListItemDto } from 'dto/discount.list.item.dto';

export class DiscountFilterDto {
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEnum(DiscountFilterType)
  discountFilterType: DiscountFilterType;

  @ValidateIf(o => o.discountFilterType !== DiscountFilterType.ALL)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isInList: boolean;

  @ValidateIf(o => o.discountFilterType === DiscountFilterType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  products: DiscountListItemDto[];

  @ValidateIf(o => o.discountFilterType === DiscountFilterType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  companies: DiscountListItemDto[];

  @ValidateIf(o => o.discountFilterType === DiscountFilterType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DiscountListItemDto)
  categories: DiscountListItemDto[];
}