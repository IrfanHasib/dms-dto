import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { RouteBaseDto } from './route.base.dto';

export class RouteItemDto extends Mixin(BaseDBFieldsDto, RouteBaseDto) {}
