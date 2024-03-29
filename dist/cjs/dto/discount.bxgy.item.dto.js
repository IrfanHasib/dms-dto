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
exports.DiscountBxgyItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var BXGYDiscountType_1 = require("../enum/BXGYDiscountType");
var BXGYType_1 = require("../enum/BXGYType");
var ts_mixer_1 = require("ts-mixer");
var discount_bxgy_item_item_dto_1 = require("./discount.bxgy.item.item.dto");
var DiscountBxgyItemDto = /** @class */ (function () {
    function DiscountBxgyItemDto() {
        this.isBXGYRecursive = false;
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "minimumQuantity", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "bonusQuantity", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsEnum)(BXGYDiscountType_1.BXGYDiscountType)),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "discountType", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return o.discountType !== BXGYDiscountType_1.BXGYDiscountType.FREE; })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "discountAmount", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], DiscountBxgyItemDto.prototype, "isBXGYRecursive", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsEnum)(BXGYType_1.BXGYType)),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "BXGYType", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return !o.isBXGYRecursive; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "maximumQuantity", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return o.BXGYType !== BXGYType_1.BXGYType.ALL; })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value, obj = _a.obj;
            return value === null || value === void 0 ? void 0 : value.map(function (valueObj) {
                valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
                return valueObj;
            });
        })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsArray)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateNested)({ each: true })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ArrayMinSize)(1)),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return discount_bxgy_item_item_dto_1.DiscountBxgyItemItemDto; })),
        __metadata("design:type", Array)
    ], DiscountBxgyItemDto.prototype, "discountBXGYItemItems", void 0);
    return DiscountBxgyItemDto;
}());
exports.DiscountBxgyItemDto = DiscountBxgyItemDto;
//# sourceMappingURL=discount.bxgy.item.dto.js.map