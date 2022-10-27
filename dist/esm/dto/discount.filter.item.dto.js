var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested, } from 'class-validator';
import { Transform, Type } from 'class-transformer';
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
    ], DiscountFilterItemDto.prototype, "id", void 0);
    __decorate([
        IsNotEmpty(),
        IsEnum(DiscountFilterType),
        __metadata("design:type", String)
    ], DiscountFilterItemDto.prototype, "discountFilterType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType !== DiscountFilterType.ALL; }),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountFilterItemDto.prototype, "isInList", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.PRODUCTS; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "products", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.COMPANIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "companies", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.CATEGORIES; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "categories", void 0);
    return DiscountFilterItemDto;
}());
export { DiscountFilterItemDto };
//# sourceMappingURL=discount.filter.item.dto.js.map