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
exports.DiscountConditionItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var conditionCountType_1 = require("../enum/conditionCountType");
var conditionOperator_1 = require("../enum/conditionOperator");
var discountConditionType_1 = require("../enum/discountConditionType");
var ts_mixer_1 = require("ts-mixer");
var DiscountConditionItemDto = /** @class */ (function () {
    function DiscountConditionItemDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "conditionValue", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsEnum)(conditionOperator_1.ConditionOperator)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionOperator", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsEnum)(discountConditionType_1.DiscountConditionType)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionType", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsEnum)(conditionCountType_1.ConditionCountType)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionCountType", void 0);
    return DiscountConditionItemDto;
}());
exports.DiscountConditionItemDto = DiscountConditionItemDto;
//# sourceMappingURL=discount.condition.item.dto.js.map