import { IsInt, IsNumber, IsNumberString, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginateRequestDto {
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  page?: number = 1;

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

  @IsOptional()
  @IsString()
  search?: string;
}
