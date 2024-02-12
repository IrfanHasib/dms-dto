"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverySummaryUpdateDto = void 0;
var deliverySummary_base_dto_1 = require("./deliverySummary.base.dto");
var ts_mixer_1 = require("ts-mixer");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var deliverySummaryProduct_update_dto_1 = require("./deliverySummaryProduct.update.dto");
var transformBoolean_1 = require("../utils/transformBoolean");
var DeliverySummaryUpdateDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryUpdateDto, _super);
    function DeliverySummaryUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; }))
    ], DeliverySummaryUpdateDto.prototype, "deliveryByUserId", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsArray)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateNested)({ each: true })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return deliverySummaryProduct_update_dto_1.DeliverySummaryProductUpdateDto; }))
    ], DeliverySummaryUpdateDto.prototype, "deliverySummaryProducts", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsArray)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)({ each: true })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; }))
    ], DeliverySummaryUpdateDto.prototype, "deliverySummaryOrderIds", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)())
    ], DeliverySummaryUpdateDto.prototype, "isDispatched", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)())
    ], DeliverySummaryUpdateDto.prototype, "isReturned", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)())
    ], DeliverySummaryUpdateDto.prototype, "isCompleted", void 0);
    return DeliverySummaryUpdateDto;
}(deliverySummary_base_dto_1.DeliverySummaryBaseDto));
exports.DeliverySummaryUpdateDto = DeliverySummaryUpdateDto;
