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
exports.OrderItemCartOperationDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var ts_mixer_1 = require("ts-mixer");
var OrderItemCartOperationDto = /** @class */ (function () {
    function OrderItemCartOperationDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemCartOperationDto.prototype, "quantity", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemCartOperationDto.prototype, "productId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemCartOperationDto.prototype, "orderId", void 0);
    return OrderItemCartOperationDto;
}());
exports.OrderItemCartOperationDto = OrderItemCartOperationDto;
//# sourceMappingURL=orderItem.cartOperation.dto.js.map