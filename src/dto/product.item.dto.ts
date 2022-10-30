import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { ProductBaseDto } from './product.base.dto';

export class ProductItemDto extends Mixin(BaseDBFieldsDto, ProductBaseDto) {}
