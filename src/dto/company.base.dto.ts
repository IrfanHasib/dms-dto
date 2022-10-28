import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo: string;
}
