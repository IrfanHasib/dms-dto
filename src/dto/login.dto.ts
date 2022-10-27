import { IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @Length(11, 11)
  mobile: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
