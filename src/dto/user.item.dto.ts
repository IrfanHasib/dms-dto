import { UserBaseDto } from './user.base.dto';
import { IsInt, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate, Mixin } from 'ts-mixer';
import { BaseDBFieldsDto } from './baseDBFields.dto';
import { UserType } from '../enum/UserType';

export class UserItemDto extends Mixin(BaseDBFieldsDto, UserBaseDto) {
  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @ValidateIf(o => o.userType === UserType.ORGANIZATION_USER)
  @IsInt()
  @Type(() => Number)
  organizationId: number;
}
