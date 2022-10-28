import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDBFieldsDto } from './../dto/baseDBFields.dto';
import { Expose } from 'class-transformer';

export class CompanyItemDto extends BaseDBFieldsDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  logo: string;
}
