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
exports.DiscountBaseDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var bulkAdjustmentCountType_1 = require("./../enum/bulkAdjustmentCountType");
var cartAdjustmentDiscountType_1 = require("./../enum/cartAdjustmentDiscountType");
var DiscountType_1 = require("./../enum/DiscountType");
var ProductAdjustmentDiscountType_1 = require("./../enum/ProductAdjustmentDiscountType");
var BXGYType_1 = require("./../enum/BXGYType");
var BXGYCountType_1 = require("./../enum/BXGYCountType");
var BXGYGetType_1 = require("./../enum/BXGYGetType");
var discount_bulk_item_dto_1 = require("./../dto/discount.bulk.item.dto");
var discount_bxgy_item_dto_1 = require("./../dto/discount.bxgy.item.dto");
var discount_bxgx_item_dto_1 = require("./../dto/discount.bxgx.item.dto");
var discount_filter_item_dto_1 = require("./../dto/discount.filter.item.dto");
var discount_condition_item_dto_1 = require("./../dto/discount.condition.item.dto");
var DiscountBaseDto = /** @class */ (function () {
    function DiscountBaseDto() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(DiscountType_1.DiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "discountType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isEnabled", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreOther", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreThisIfOtherMatched", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "priority", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_validator_1.IsInt)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "usageLimit", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.PRODUCT_ADJUSTMENT; }),
        (0, class_validator_1.IsEnum)(ProductAdjustmentDiscountType_1.ProductAdjustmentDiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.PRODUCT_ADJUSTMENT; }),
        (0, class_validator_1.IsDecimal)(),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.CART_ADJUSTMENT; }),
        (0, class_validator_1.IsEnum)(cartAdjustmentDiscountType_1.CartAdjustmentDiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.CART_ADJUSTMENT; }),
        (0, class_validator_1.IsDecimal)(),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.CART_ADJUSTMENT; }),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentLabel", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BULK_ADJUSTMENT; }),
        (0, class_validator_1.IsEnum)(bulkAdjustmentCountType_1.BulkAdjustmentCountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "bulkAdjustmentCountType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BULK_ADJUSTMENT; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return discount_bulk_item_dto_1.DiscountBulkItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBulks", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGX; }),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGXRecursive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGX; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Transform)(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.isBXGXRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive;
                return valueObj;
            });
        }),
        (0, class_transformer_1.Type)(function () { return discount_bxgx_item_dto_1.DiscountBxgxItemDto; }),
        (0, class_validator_1.ValidateNested)({ each: true }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGXs", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGY; }),
        (0, class_validator_1.IsEnum)(BXGYType_1.BXGYType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGY; }),
        (0, class_validator_1.IsEnum)(BXGYCountType_1.BXGYCountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYCountType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGY; }),
        (0, class_validator_1.IsEnum)(BXGYGetType_1.BXGYGetType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYGetType", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGY; }),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGYRecursive", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(function (o) { return o.discountType === DiscountType_1.DiscountType.BXGY; }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Transform)(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
                valueObj.isBXGYRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive;
                return valueObj;
            });
        }),
        (0, class_transformer_1.Type)(function () { return discount_bxgy_item_dto_1.DiscountBxgyItemDto; }),
        (0, class_validator_1.ValidateNested)({ each: true }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGYs", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeFromDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (_object, value) { return !!value; }),
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeToDateTime", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isMatchAllCondition", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_transformer_1.Type)(function () { return discount_filter_item_dto_1.DiscountFilterItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountFilers", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.ArrayMinSize)(0),
        (0, class_transformer_1.Type)(function () { return discount_condition_item_dto_1.DiscountConditionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountConditions", void 0);
    return DiscountBaseDto;
}());
exports.DiscountBaseDto = DiscountBaseDto;
//# sourceMappingURL=discount.base.dto.js.map