import { BaseDBFieldsDto } from './baseDBFields.dto';
import { Mixin } from 'ts-mixer';
import { CategoryCreateDto } from './category.create.dto';

export class CategoryItemDto extends Mixin(BaseDBFieldsDto, CategoryCreateDto) {}
