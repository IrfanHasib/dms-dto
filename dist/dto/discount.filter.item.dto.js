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
exports.DiscountFilterItemDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
require("reflect-metadata");
var DiscountFilterType_1 = require("./../enum/DiscountFilterType");
var autoComplete_option_item_dto_1 = require("./../dto/autoComplete.option.item.dto");
var DiscountFilterItemDto = /** @class */ (function () {
    function DiscountFilterItemDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DiscountFilterItemDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(DiscountFilterType_1.DiscountFilterType),
        __metadata("design:type", String)
    ], DiscountFilterItemDto.prototype, "discountFilterType");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType !== DiscountFilterType_1.DiscountFilterType.ALL; }),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountFilterItemDto.prototype, "isInList");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === DiscountFilterType_1.DiscountFilterType.PRODUCTS; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return autoComplete_option_item_dto_1.AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "products");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === DiscountFilterType_1.DiscountFilterType.COMPANIES; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return autoComplete_option_item_dto_1.AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "companies");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountFilterType === DiscountFilterType_1.DiscountFilterType.CATEGORIES; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return autoComplete_option_item_dto_1.AutoCompleteOptionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "categories");
    return DiscountFilterItemDto;
}());
exports.DiscountFilterItemDto = DiscountFilterItemDto;
