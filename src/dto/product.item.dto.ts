import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BaseDBFieldsDto } from './baseDBFields.dto';

export class ProductItemDto extends BaseDBFieldsDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  barcode: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cost: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  mrp: number;

  @Expose()
  @IsOptional()
  @IsString()
  description: string;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  order: number;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  categoryId: number;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  companyId: number;

  @Expose()
  @Expose()
  @IsOptional()
  @IsString()
  image: string;
}
