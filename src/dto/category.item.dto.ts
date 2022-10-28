import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CategoryItemDto extends BaseDBFieldsDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  icon: string;

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
  order: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  companyId: number;
}
