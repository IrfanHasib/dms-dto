import { __decorate, __metadata } from "tslib";
import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { BulkDiscountType } from './../enum/bulkDiscountType';
var DiscountBulkItemDto = /** @class */ (function () {
    function DiscountBulkItemDto() {
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "minimumQuantity");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "maximumQuantity");
    __decorate([
        IsNotEmpty(),
        IsEnum(BulkDiscountType),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "discountType");
    __decorate([
        IsNotEmpty(),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "discountAmount");
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "label");
    return DiscountBulkItemDto;
}());
export { DiscountBulkItemDto };
//# sourceMappingURL=discount.bulk.item.dto.js.map