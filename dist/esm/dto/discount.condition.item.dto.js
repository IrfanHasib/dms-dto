var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
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