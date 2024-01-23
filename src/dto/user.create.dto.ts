import { UserBaseDto } from './user.base.dto';
import { IsInt, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';

export class UserCreateDto extends UserBaseDto {
  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
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
