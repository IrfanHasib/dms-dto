"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.DiscountBxgxItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
require("reflect-metadata");
var BXGXDiscountType_1 = require("./../enum/BXGXDiscountType");
var DiscountBxgxItemDto = /** @class */ (function () {
    function DiscountBxgxItemDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "minimumQuantity");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "bonusQuantity");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(BXGXDiscountType_1.BXGXDiscountType),
        __metadata("design:type", String)
    ], DiscountBxgxItemDto.prototype, "discountType");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType !== BXGXDiscountType_1.BXGXDiscountType.FREE; }),
        (0, class_validator_1.IsDecimal)(),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "discountAmount");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], DiscountBxgxItemDto.prototype, "isBXGXRecursive");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return !o.isBXGXRecursive; }),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "maximumQuantity");
    return DiscountBxgxItemDto;
}());
exports.DiscountBxgxItemDto = DiscountBxgxItemDto;
//# sourceMappingURL=discount.bxgx.item.dto.js.map