import { IsInt, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

export class PaginateRequestDto {
  @Expose()
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  page?: number = 1;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    let limit = value;
    limit = limit > 100 ? 100 : limit;
    return limit;
  })
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  limit?: number = 10;

  @Expose()
  @IsOptional()
  @IsString()
  search?: string;
}
