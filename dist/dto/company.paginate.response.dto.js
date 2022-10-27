import { __decorate, __extends, __metadata } from "tslib";
import 'reflect-metadata';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyItemDto } from './../dto/company.item.dto';
import { PaginateResponseMetadataDto } from './../dto/paginate.response.metadata.dto';
var CompanyPaginateResponseDto = /** @class */ (function (_super) {
    __extends(CompanyPaginateResponseDto, _super);
    function CompanyPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        IsArray(),
        Type(function () { return CompanyItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], CompanyPaginateResponseDto.prototype, "items");
    return CompanyPaginateResponseDto;
}(PaginateResponseMetadataDto));
export { CompanyPaginateResponseDto };
//# sourceMappingURL=company.paginate.response.dto.js.map