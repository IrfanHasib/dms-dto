import 'reflect-metadata';
import { PaginateMetadataDto } from './../dto/paginate.metadata.dto';
import { CompanyItemDto } from './../dto/company.item.dto';
export declare class CompanyPaginateResponseDt extends PaginateMetadataDto {
    items: CompanyItemDto[];
}
