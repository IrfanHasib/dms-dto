import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { CustomerBaseDto } from './customer.base.dto';

export class CustomerItemDto extends Mixin(BaseDBFieldsDto, CustomerBaseDto) {}
