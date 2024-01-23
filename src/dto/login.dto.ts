import { IsNotEmpty, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class LoginDTO {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Length(11, 11))
  mobile: string;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Length(6))
  password: string;
}
