import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CategoryBaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  icon?: string;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  categoryId?: number;

  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  order?: number;
}
