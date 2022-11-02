import { IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class CustomerBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  name: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @IsString()
  address: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  photo?: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(Length(11, 11))
  @decorate(IsMobilePhone('bn-BD'))
  mobile?: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  latitude?: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(Type(() => Number))
  @decorate(IsNumber())
  longitude?: number;
}
