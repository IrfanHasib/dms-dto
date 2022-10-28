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
import {Expose, Transform, Type} from 'class-transformer';
import { DiscountFilterType } from './../enum/DiscountFilterType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';

export class DiscountFilterItemDto {
  @Expose()
  @IsOptional()
  @ValidateIf((_object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(DiscountFilterType)
  discountFilterType: DiscountFilterType;

  @Expose()
  @ValidateIf(o => o.discountFilterType !== DiscountFilterType.ALL)
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isInList: boolean;

  @Expose()
  @ValidateIf(o => o.discountFilterType === DiscountFilterType.PRODUCTS)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  products: AutoCompleteOptionItemDto[];

  @Expose()
  @ValidateIf(o => o.discountFilterType === DiscountFilterType.COMPANIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  companies: AutoCompleteOptionItemDto[];

  @Expose()
  @ValidateIf(o => o.discountFilterType === DiscountFilterType.CATEGORIES)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoCompleteOptionItemDto)
  categories: AutoCompleteOptionItemDto[];
}
