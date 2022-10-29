import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProductBaseDto {
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
  @IsDecimal()
  cost: number;

  @Expose()
  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsDecimal()
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
  @IsOptional()
  @IsString()
  image: string;
}
