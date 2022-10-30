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
exports.BaseDBFieldsDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var ts_mixer_1 = require("ts-mixer");
var typeorm_1 = require("typeorm");
var BaseDBFieldsDto = /** @class */ (function () {
    function BaseDBFieldsDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, typeorm_1.PrimaryGeneratedColumn)()),
        __metadata("design:type", Number)
    ], BaseDBFieldsDto.prototype, "id", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        (0, ts_mixer_1.decorate)((0, typeorm_1.Column)({
            nullable: false,
            default: false,
            type: 'boolean',
        })),
        __metadata("design:type", Boolean)
    ], BaseDBFieldsDto.prototype, "isDeleted", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsDate)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Date; })),
        (0, ts_mixer_1.decorate)((0, typeorm_1.CreateDateColumn)()),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "createdAt", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsDate)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Date; })),
        (0, ts_mixer_1.decorate)((0, typeorm_1.UpdateDateColumn)()),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "updatedAt", void 0);
    return BaseDBFieldsDto;
}());
exports.BaseDBFieldsDto = BaseDBFieldsDto;
//# sourceMappingURL=baseDBFields.dto.js.map