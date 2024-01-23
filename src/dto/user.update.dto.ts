import { UserBaseDto } from './user.base.dto';
import { IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose } from 'class-transformer';

export class UserUpdateDto extends UserBaseDto {
  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsString()
  @MinLength(6)
  password: string;
}
