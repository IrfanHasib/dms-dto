import { BaseDBFieldsDto } from './baseDBFields.dto';
import { CompanyBaseDto } from './company.base.dto';
import { Mixin } from 'ts-mixer';

class CompanyItemDto extends Mixin(BaseDBFieldsDto, CompanyBaseDto) {}

export { CompanyItemDto };
