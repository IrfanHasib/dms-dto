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
import { DiscountFilterType } from './../enum/DiscountFilterType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';

export class DiscountFilterItemDto {
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
  @Type(() => AutoCompleteOptionItemDto)
  products: AutoCompleteOptionItemDto[];

  @ValidateIf(o => o.discountFilterType === DiscountFilterType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  companies: AutoCompleteOptionItemDto[];

  @ValidateIf(o => o.discountFilterType === DiscountFilterType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  categories: AutoCompleteOptionItemDto[];
}
