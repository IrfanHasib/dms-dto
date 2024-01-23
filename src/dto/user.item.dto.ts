import { UserBaseDto } from './user.base.dto';
import { IsInt, IsOptional, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate, Mixin } from 'ts-mixer';
import { BaseDBFieldsDto } from './baseDBFields.dto';

export class UserItemDto extends Mixin(BaseDBFieldsDto, UserBaseDto) {
  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsInt()
  @Type(() => Number)
  organizationId: number;
}
