var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
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
    ], DiscountBxgxItemDto.prototype, "id", void 0);
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "minimumQuantity", void 0);
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "bonusQuantity", void 0);
    __decorate([
        IsNotEmpty(),
        IsEnum(BXGXDiscountType),
        __metadata("design:type", String)
    ], DiscountBxgxItemDto.prototype, "discountType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType !== BXGXDiscountType.FREE; }),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "discountAmount", void 0);
    __decorate([
        IsNotEmpty(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], DiscountBxgxItemDto.prototype, "isBXGXRecursive", void 0);
    __decorate([
        ValidateIf(function (o) { return !o.isBXGXRecursive; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "maximumQuantity", void 0);
    return DiscountBxgxItemDto;
}());
export { DiscountBxgxItemDto };
//# sourceMappingURL=discount.bxgx.item.dto.js.map