import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { DiscountBaseDto } from './discount.base.dto';

export class DiscountItemDto extends Mixin(BaseDBFieldsDto, DiscountBaseDto) {}
