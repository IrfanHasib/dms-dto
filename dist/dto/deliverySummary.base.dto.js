"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverySummaryBaseDto = void 0;
var ts_mixer_1 = require("ts-mixer");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var transformBoolean_1 = require("../utils/transformBoolean");
var DeliverySummaryBaseDto = /** @class */ (function () {
    function DeliverySummaryBaseDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsString)())
    ], DeliverySummaryBaseDto.prototype, "comment", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; }))
    ], DeliverySummaryBaseDto.prototype, "routeId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Date; })),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsDate)())
    ], DeliverySummaryBaseDto.prototype, "deliveryDate", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)())
    ], DeliverySummaryBaseDto.prototype, "isCanceled", void 0);
    return DeliverySummaryBaseDto;
}());
exports.DeliverySummaryBaseDto = DeliverySummaryBaseDto;
