var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
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
    ], DiscountBulkItemDto.prototype, "id", void 0);
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "minimumQuantity", void 0);
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "maximumQuantity", void 0);
    __decorate([
        IsNotEmpty(),
        IsEnum(BulkDiscountType),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "discountType", void 0);
    __decorate([
        IsNotEmpty(),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "discountAmount", void 0);
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "label", void 0);
    return DiscountBulkItemDto;
}());
export { DiscountBulkItemDto };
//# sourceMappingURL=discount.bulk.item.dto.js.map