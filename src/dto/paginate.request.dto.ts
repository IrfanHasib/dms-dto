import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

export class PaginateRequestDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  page: number = 1;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    let limit = value;
    limit = limit > 100 ? 100 : limit;
    return limit;
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  limit: number = 10;

  @Expose()
  @IsOptional()
  @IsString()
  search?: string;
}
