import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class CompanyBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  name: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  logo: string;
}
