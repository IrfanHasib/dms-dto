import { __decorate, __metadata } from "tslib";
import { ArrayMinSize, IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { BXGYDiscountType } from './../enum/BXGYDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';
var DiscountBxgyItemDto = /** @class */ (function () {
    function DiscountBxgyItemDto() {
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "minimumQuantity");
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "bonusQuantity");
    __decorate([
        IsNotEmpty(),
        IsEnum(BXGYDiscountType),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "discountType");
    __decorate([
        ValidateIf(function (o) { return o.discountType !== BXGYDiscountType.FREE; }),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "discountAmount");
    __decorate([
        IsNotEmpty(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], DiscountBxgyItemDto.prototype, "isBXGYRecursive");
    __decorate([
        IsNotEmpty(),
        IsEnum(BXGYType),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "BXGYType");
    __decorate([
        ValidateIf(function (o) { return !o.isBXGYRecursive; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "maximumQuantity");
    __decorate([
        ValidateIf(function (o) { return o.BXGYType === BXGYType.PRODUCTS; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBxgyItemDto.prototype, "products");
    __decorate([
        ValidateIf(function (o) { return o.BXGYType === BXGYType.COMPANIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBxgyItemDto.prototype, "companies");
    __decorate([
        ValidateIf(function (o) { return o.BXGYType === BXGYType.CATEGORIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBxgyItemDto.prototype, "categories");
    return DiscountBxgyItemDto;
}());
export { DiscountBxgyItemDto };
//# sourceMappingURL=discount.bxgy.item.dto.js.map