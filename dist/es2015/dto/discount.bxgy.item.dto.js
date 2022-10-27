var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMinSize, IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import { BXGYDiscountType } from './../enum/BXGYDiscountType';
import { BXGYType } from './../enum/BXGYType';
import { AutoCompleteOptionItemDto } from './../dto/autoComplete.option.item.dto';
export class DiscountBxgyItemDto {
}
__decorate([
    IsOptional(),
    ValidateIf((_object, value) => !!value),
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], DiscountBxgyItemDto.prototype, "id", void 0);
__decorate([
    IsNotEmpty(),
    IsInt(),
    Type(() => Number),
    __metadata("design:type", Number)
], DiscountBxgyItemDto.prototype, "minimumQuantity", void 0);
__decorate([
    IsNotEmpty(),
    IsInt(),
    Type(() => Number),
    __metadata("design:type", Number)
], DiscountBxgyItemDto.prototype, "bonusQuantity", void 0);
__decorate([
    IsNotEmpty(),
    IsEnum(BXGYDiscountType),
    __metadata("design:type", String)
], DiscountBxgyItemDto.prototype, "discountType", void 0);
__decorate([
    ValidateIf(o => o.discountType !== BXGYDiscountType.FREE),
    IsDecimal(),
    __metadata("design:type", Number)
], DiscountBxgyItemDto.prototype, "discountAmount", void 0);
__decorate([
    IsNotEmpty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], DiscountBxgyItemDto.prototype, "isBXGYRecursive", void 0);
__decorate([
    IsNotEmpty(),
    IsEnum(BXGYType),
    __metadata("design:type", String)
], DiscountBxgyItemDto.prototype, "BXGYType", void 0);
__decorate([
    ValidateIf(o => !o.isBXGYRecursive),
    IsInt(),
    Type(() => Number),
    __metadata("design:type", Number)
], DiscountBxgyItemDto.prototype, "maximumQuantity", void 0);
__decorate([
    ValidateIf(o => o.BXGYType === BXGYType.PRODUCTS),
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1),
    Type(() => AutoCompleteOptionItemDto),
    __metadata("design:type", Array)
], DiscountBxgyItemDto.prototype, "products", void 0);
__decorate([
    ValidateIf(o => o.BXGYType === BXGYType.COMPANIES),
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1),
    Type(() => AutoCompleteOptionItemDto),
    __metadata("design:type", Array)
], DiscountBxgyItemDto.prototype, "companies", void 0);
__decorate([
    ValidateIf(o => o.BXGYType === BXGYType.CATEGORIES),
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1),
    Type(() => AutoCompleteOptionItemDto),
    __metadata("design:type", Array)
], DiscountBxgyItemDto.prototype, "categories", void 0);
//# sourceMappingURL=discount.bxgy.item.dto.js.map