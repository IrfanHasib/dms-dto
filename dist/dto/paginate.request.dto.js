import { __decorate, __metadata } from "tslib";
import 'reflect-metadata';
import { IsInt, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';
var PaginateRequestDto = /** @class */ (function () {
    function PaginateRequestDto() {
        this.page = 1;
        this.limit = 10;
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateRequestDto.prototype, "page");
    __decorate([
        IsOptional(),
        Transform(function (_a) {
            var value = _a.value;
            var limit = value;
            limit = limit > 100 ? 100 : limit;
            return limit;
        }),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateRequestDto.prototype, "limit");
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], PaginateRequestDto.prototype, "search");
    return PaginateRequestDto;
}());
export { PaginateRequestDto };
//# sourceMappingURL=paginate.request.dto.js.map