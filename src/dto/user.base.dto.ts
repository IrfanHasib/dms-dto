import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { decorate } from 'ts-mixer';
import { Expose } from 'class-transformer';
import { UserType } from '../enum/UserType';
import { DMSRole } from '../enum/DMSRole';
import { OrganizationRole } from '../enum/organizationRole';

export class UserBaseDto {
  @decorate(Expose())
  @IsNotEmpty()
  @IsString()
  name: string;

  @decorate(Expose())
  @IsNotEmpty()
  @Length(11, 11)
  @IsMobilePhone('bn-BD')
  mobile: string;

  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsEmail()
  email: string;

  @decorate(Expose())
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  @IsString()
  address: string;

  @decorate(Expose())
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  @decorate(Expose())
  @ValidateIf(o => o.userType === UserType.DMS_USER)
  @IsNotEmpty()
  @IsEnum(DMSRole)
  dmsRole: DMSRole;

  @decorate(Expose())
  @ValidateIf(o => o.userType === UserType.ORGANIZATION_USER)
  @IsNotEmpty()
  @IsEnum(OrganizationRole)
  organizationRole: OrganizationRole;
}
