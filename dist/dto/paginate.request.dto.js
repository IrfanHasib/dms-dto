"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateRequestDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var PaginateRequestDto = /** @class */ (function () {
    function PaginateRequestDto() {
        this.page = 1;
        this.limit = 10;
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsInt)()
    ], PaginateRequestDto.prototype, "page", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            var limit = value;
            limit = limit > 100 ? 100 : limit;
            return limit;
        }),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsInt)()
    ], PaginateRequestDto.prototype, "limit", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], PaginateRequestDto.prototype, "search", void 0);
    return PaginateRequestDto;
}());
exports.PaginateRequestDto = PaginateRequestDto;
