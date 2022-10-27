import { __decorate, __metadata } from "tslib";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import 'reflect-metadata';
import { Type } from 'class-transformer';
var BaseDBFieldsDto = /** @class */ (function () {
    function BaseDBFieldsDto() {
    }
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], BaseDBFieldsDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], BaseDBFieldsDto.prototype, "isDeleted");
    __decorate([
        IsNotEmpty(),
        IsDate(),
        Type(function () { return Date; }),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "createdAt");
    __decorate([
        IsNotEmpty(),
        IsDate(),
        Type(function () { return Date; }),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "updatedAt");
    return BaseDBFieldsDto;
}());
export { BaseDBFieldsDto };
//# sourceMappingURL=baseDBFields.dto.js.map