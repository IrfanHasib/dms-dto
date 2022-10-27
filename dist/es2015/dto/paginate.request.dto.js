var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
export class PaginateRequestDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
__decorate([
    IsOptional(),
    ValidateIf((object, value) => !!value),
    Type(() => Number),
    IsNumber(),
    IsInt(),
    __metadata("design:type", Number)
], PaginateRequestDto.prototype, "page", void 0);
__decorate([
    IsOptional(),
    Transform(({ value }) => {
        let limit = value;
        limit = limit > 100 ? 100 : limit;
        return limit;
    }),
    ValidateIf((object, value) => !!value),
    Type(() => Number),
    IsNumber(),
    IsInt(),
    __metadata("design:type", Number)
], PaginateRequestDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PaginateRequestDto.prototype, "search", void 0);
//# sourceMappingURL=paginate.request.dto.js.map