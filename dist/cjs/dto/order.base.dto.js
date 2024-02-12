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
exports.OrderBaseDto = void 0;
var class_validator_1 = require("class-validator");
var ts_mixer_1 = require("ts-mixer");
var class_transformer_1 = require("class-transformer");
var transformBoolean_1 = require("../utils/transformBoolean");
var OrderBaseDto = /** @class */ (function () {
    function OrderBaseDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsString)()),
        __metadata("design:type", String)
    ], OrderBaseDto.prototype, "comment", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderBaseDto.prototype, "customerId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], OrderBaseDto.prototype, "isCanceled", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], OrderBaseDto.prototype, "isDelivered", void 0);
    return OrderBaseDto;
}());
exports.OrderBaseDto = OrderBaseDto;
//# sourceMappingURL=order.base.dto.js.map