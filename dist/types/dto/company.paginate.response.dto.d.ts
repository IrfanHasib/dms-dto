import { CompanyItemDto } from './company.item.dto';
import { PaginateResponseMetadataDto } from './paginate.response.metadata.dto';
export declare class CompanyPaginateResponseDto extends PaginateResponseMetadataDto {
    items: CompanyItemDto[];
}
