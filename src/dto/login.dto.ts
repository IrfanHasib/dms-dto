import { IsNotEmpty, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginDTO {
  @Expose()
  @IsNotEmpty()
  @Length(11, 11)
  mobile: string;

  @Expose()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
