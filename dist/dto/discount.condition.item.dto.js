import { __decorate, __metadata } from "tslib";
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { ConditionCountType } from './../enum/conditionCountType';
import { ConditionOperator } from './../enum/conditionOperator';
import { DiscountConditionType } from './../enum/discountConditionType';
var DiscountConditionItemDto = /** @class */ (function () {
    function DiscountConditionItemDto() {
    }
    __decorate([
        IsOptional(),
        ValidateIf(function (_object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "id");
    __decorate([
        IsNotEmpty(),
        IsDecimal(),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "conditionValue");
    __decorate([
        IsNotEmpty(),
        IsEnum(ConditionOperator),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionOperator");
    __decorate([
        IsNotEmpty(),
        IsEnum(DiscountConditionType),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionType");
    __decorate([
        IsNotEmpty(),
        IsEnum(ConditionCountType),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionCountType");
    return DiscountConditionItemDto;
}());
export { DiscountConditionItemDto };
//# sourceMappingURL=discount.condition.item.dto.js.map