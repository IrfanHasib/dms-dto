import { IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import 'reflect-metadata';
import { Type } from 'class-transformer';

export class BaseDBFieldsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
