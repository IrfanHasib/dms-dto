import { __decorate, __metadata } from "tslib";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested, } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { DiscountFilterType } from './../enum/DiscountFilterType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';
var DiscountFilterItemDto = /** @class */ (function () {
    function DiscountFilterItemDto() {
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        __metadata("design:type", Number)
    ], DiscountFilterItemDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsEnum(DiscountFilterType),
        __metadata("design:type", String)
    ], DiscountFilterItemDto.prototype, "discountFilterType");
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType !== DiscountFilterType.ALL; }),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountFilterItemDto.prototype, "isInList");
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.PRODUCTS; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "products");
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.COMPANIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "companies");
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.CATEGORIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "categories");
    return DiscountFilterItemDto;
}());
export { DiscountFilterItemDto };
//# sourceMappingURL=discount.filter.item.dto.js.map