import 'reflect-metadata';
import { CompanyItemDto } from './../dto/company.item.dto';
import { PaginateResponseMetadataDto } from './../dto/paginate.response.metadata.dto';
export declare class CompanyPaginateResponseDto extends PaginateResponseMetadataDto {
    items: CompanyItemDto[];
}
