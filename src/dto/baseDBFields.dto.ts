import { IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class BaseDBFieldsDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
