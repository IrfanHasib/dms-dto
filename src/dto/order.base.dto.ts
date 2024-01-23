import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose } from 'class-transformer';

export class OrderBaseDto {
  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(IsString())
  comment: string;
}
