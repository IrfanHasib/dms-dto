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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountBulkItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var bulkDiscountType_1 = require("./../enum/bulkDiscountType");
var DiscountBulkItemDto = /** @class */ (function () {
    function DiscountBulkItemDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "minimumQuantity", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "maximumQuantity", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(bulkDiscountType_1.BulkDiscountType),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "discountType", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDecimal)(),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "discountAmount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "label", void 0);
    return DiscountBulkItemDto;
}());
exports.DiscountBulkItemDto = DiscountBulkItemDto;
//# sourceMappingURL=discount.bulk.item.dto.js.map