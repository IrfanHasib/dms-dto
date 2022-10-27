import 'reflect-metadata';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDBFieldsDto } from './../dto/baseDBFields.dto';

export class CompanyItemDto extends BaseDBFieldsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo: string;
}
