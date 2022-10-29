import { BaseDBFieldsDto } from './baseDBFields.dto';
export declare class ProductItemDto extends BaseDBFieldsDto {
    name: string;
    barcode: string;
    cost: number;
    price: number;
    mrp: number;
    description: string;
    order: number;
    categoryId: number;
    companyId: number;
    image: string;
}
