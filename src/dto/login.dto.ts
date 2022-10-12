import { IsNotEmpty, Length } from 'class-validator';
import 'reflect-metadata';

export class LoginDTO {
  @IsNotEmpty()
  @Length(11, 11)
  mobile: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
