import { __decorate, __metadata } from "tslib";
import 'reflect-metadata';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
var PaginateResponseMetadataDto = /** @class */ (function () {
    function PaginateResponseMetadataDto() {
    }
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "itemCount");
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "totalItems");
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "itemsPerPage");
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "totalPages");
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "currentPage");
    return PaginateResponseMetadataDto;
}());
export { PaginateResponseMetadataDto };
//# sourceMappingURL=paginate.response.metadata.dto.js.map