import { __decorate, __metadata } from "tslib";
import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { BXGXDiscountType } from './../enum/BXGXDiscountType';
var DiscountBxgxItemDto = /** @class */ (function () {
    function DiscountBxgxItemDto() {
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "minimumQuantity");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "bonusQuantity");
    __decorate([
        IsNotEmpty(),
        IsEnum(BXGXDiscountType),
        __metadata("design:type", String)
    ], DiscountBxgxItemDto.prototype, "discountType");
    __decorate([
        ValidateIf(function (o) { return o.discountType !== BXGXDiscountType.FREE; }),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "discountAmount");
    __decorate([
        IsNotEmpty(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], DiscountBxgxItemDto.prototype, "isBXGXRecursive");
    __decorate([
        ValidateIf(function (o) { return !o.isBXGXRecursive; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "maximumQuantity");
    return DiscountBxgxItemDto;
}());
export { DiscountBxgxItemDto };
//# sourceMappingURL=discount.bxgx.item.dto.js.map