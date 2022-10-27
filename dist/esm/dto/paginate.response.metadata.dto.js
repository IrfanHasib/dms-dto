var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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