import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { DeliverySummaryProductBaseDto } from './deliverySummaryProduct.base.dto';

export class DeliverySummaryProductItemDto extends Mixin(BaseDBFieldsDto, DeliverySummaryProductBaseDto) {}
