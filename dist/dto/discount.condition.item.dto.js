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
exports.DiscountConditionItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
require("reflect-metadata");
var conditionCountType_1 = require("./../enum/conditionCountType");
var conditionOperator_1 = require("./../enum/conditionOperator");
var discountConditionType_1 = require("./../enum/discountConditionType");
var DiscountConditionItemDto = /** @class */ (function () {
    function DiscountConditionItemDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDecimal)(),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "conditionValue");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(conditionOperator_1.ConditionOperator),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionOperator");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(discountConditionType_1.DiscountConditionType),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionType");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(conditionCountType_1.ConditionCountType),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionCountType");
    return DiscountConditionItemDto;
}());
exports.DiscountConditionItemDto = DiscountConditionItemDto;
//# sourceMappingURL=discount.condition.item.dto.js.map