var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class BaseDBFieldsDto {
}
__decorate([
    IsNotEmpty(),
    IsNumber(),
    IsInt(),
    __metadata("design:type", Number)
], BaseDBFieldsDto.prototype, "id", void 0);
__decorate([
    IsNotEmpty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], BaseDBFieldsDto.prototype, "isDeleted", void 0);
__decorate([
    IsNotEmpty(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], BaseDBFieldsDto.prototype, "createdAt", void 0);
__decorate([
    IsNotEmpty(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], BaseDBFieldsDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=baseDBFields.dto.js.map