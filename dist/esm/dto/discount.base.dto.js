var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMinSize, IsArray, IsDateString, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested, } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BulkAdjustmentCountType } from './../enum/bulkAdjustmentCountType';
import { CartAdjustmentDiscountType } from './../enum/cartAdjustmentDiscountType';
import { DiscountType } from './../enum/DiscountType';
import { ProductAdjustmentDiscountType } from './../enum/ProductAdjustmentDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { BXGYCountType } from './../enum/BXGYCountType';
import { BXGYGetType } from './../enum/BXGYGetType';
import { DiscountBulkItemDto } from './../dto/discount.bulk.item.dto';
import { DiscountBxgyItemDto } from './../dto/discount.bxgy.item.dto';
import { DiscountBxgxItemDto } from './../dto/discount.bxgx.item.dto';
import { DiscountFilterItemDto } from './../dto/discount.filter.item.dto';
import { DiscountConditionItemDto } from './../dto/discount.condition.item.dto';
var DiscountBaseDto = /** @class */ (function () {
    function DiscountBaseDto() {
    }
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "name", void 0);
    __decorate([
        IsNotEmpty(),
        IsEnum(DiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "discountType", void 0);
    __decorate([
        IsNotEmpty(),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isEnabled", void 0);
    __decorate([
        IsNotEmpty(),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreOther", void 0);
    __decorate([
        IsNotEmpty(),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreThisIfOtherMatched", void 0);
    __decorate([
        IsNotEmpty(),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "priority", void 0);
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "usageLimit", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.PRODUCT_ADJUSTMENT; }),
        IsEnum(ProductAdjustmentDiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.PRODUCT_ADJUSTMENT; }),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; }),
        IsEnum(CartAdjustmentDiscountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; }),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; }),
        IsString(),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentLabel", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BULK_ADJUSTMENT; }),
        IsEnum(BulkAdjustmentCountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "bulkAdjustmentCountType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BULK_ADJUSTMENT; }),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return DiscountBulkItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBulks", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGX; }),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGXRecursive", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGX; }),
        IsArray(),
        ArrayMinSize(1),
        Transform(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.isBXGXRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive;
                return valueObj;
            });
        }),
        Type(function () { return DiscountBxgxItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGXs", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; }),
        IsEnum(BXGYType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; }),
        IsEnum(BXGYCountType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYCountType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; }),
        IsEnum(BXGYGetType),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYGetType", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; }),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGYRecursive", void 0);
    __decorate([
        ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; }),
        IsArray(),
        ArrayMinSize(1),
        Transform(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
                valueObj.isBXGYRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive;
                return valueObj;
            });
        }),
        Type(function () { return DiscountBxgyItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGYs", void 0);
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        IsDateString(),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeFromDateTime", void 0);
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        IsDateString(),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeToDateTime", void 0);
    __decorate([
        IsNotEmpty(),
        Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        }),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isMatchAllCondition", void 0);
    __decorate([
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(1),
        Type(function () { return DiscountFilterItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountFilers", void 0);
    __decorate([
        IsOptional(),
        IsArray(),
        ValidateNested({ each: true }),
        ArrayMinSize(0),
        Type(function () { return DiscountConditionItemDto; }),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountConditions", void 0);
    return DiscountBaseDto;
}());
export { DiscountBaseDto };
//# sourceMappingURL=discount.base.dto.js.map