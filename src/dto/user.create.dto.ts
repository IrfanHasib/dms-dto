import { UserBaseDto } from './user.base.dto';
import { IsInt, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { UserType } from '../enum/UserType';

export class UserCreateDto extends UserBaseDto {
  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @ValidateIf(o => o.userType === UserType.ORGANIZATION_USER)
  @IsInt()
  @Type(() => Number)
  organizationId: number;

  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsString()
  @MinLength(6)
  password: string;
}
