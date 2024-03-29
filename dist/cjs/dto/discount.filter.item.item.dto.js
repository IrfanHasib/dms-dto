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
exports.DiscountFilterItemItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var discountFilterType_1 = require("../enum/discountFilterType");
var ts_mixer_1 = require("ts-mixer");
var DiscountFilterItemItemDto = /** @class */ (function () {
    function DiscountFilterItemItemDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === discountFilterType_1.DiscountFilterType.PRODUCTS; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "productId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === discountFilterType_1.DiscountFilterType.COMPANIES; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "companyId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === discountFilterType_1.DiscountFilterType.CATEGORIES; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "categoryId", void 0);
    return DiscountFilterItemItemDto;
}());
exports.DiscountFilterItemItemDto = DiscountFilterItemItemDto;
//# sourceMappingURL=discount.filter.item.item.dto.js.map