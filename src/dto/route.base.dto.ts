import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class RouteBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  name: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  description: string;
}
