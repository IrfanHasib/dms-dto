import 'reflect-metadata';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class BaseDBFieldsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
