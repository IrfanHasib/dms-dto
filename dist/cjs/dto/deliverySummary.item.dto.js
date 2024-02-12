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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverySummaryItemDto = void 0;
var baseDBFields_dto_1 = require("./baseDBFields.dto");
var ts_mixer_1 = require("ts-mixer");
var deliverySummary_base_dto_1 = require("./deliverySummary.base.dto");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var deliverySummaryProduct_item_dto_1 = require("./deliverySummaryProduct.item.dto");
var user_item_dto_1 = require("./user.item.dto");
var route_item_dto_1 = require("./route.item.dto");
var transformBoolean_1 = require("../utils/transformBoolean");
var DeliverySummaryItemDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryItemDto, _super);
    function DeliverySummaryItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsArray)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsInt)({ each: true })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Array)
    ], DeliverySummaryItemDto.prototype, "ordersIds", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsArray)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.ValidateNested)({ each: true })),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return deliverySummaryProduct_item_dto_1.DeliverySummaryProductItemDto; })),
        __metadata("design:type", Array)
    ], DeliverySummaryItemDto.prototype, "deliverySummaryProducts", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return user_item_dto_1.UserItemDto; })),
        __metadata("design:type", user_item_dto_1.UserItemDto)
    ], DeliverySummaryItemDto.prototype, "deliveryByUser", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsOptional)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return route_item_dto_1.RouteItemDto; })),
        __metadata("design:type", route_item_dto_1.RouteItemDto)
    ], DeliverySummaryItemDto.prototype, "route", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryItemDto.prototype, "totalDiscount", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryItemDto.prototype, "totalSaleAmount", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNumber)()),
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Type)(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryItemDto.prototype, "totalRegularAmount", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], DeliverySummaryItemDto.prototype, "isDispatched", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], DeliverySummaryItemDto.prototype, "isReturned", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], DeliverySummaryItemDto.prototype, "isCompleted", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsNotEmpty)()),
        (0, ts_mixer_1.decorate)((0, transformBoolean_1.TransformBoolean)()),
        (0, ts_mixer_1.decorate)((0, class_validator_1.IsBoolean)()),
        __metadata("design:type", Boolean)
    ], DeliverySummaryItemDto.prototype, "isCanceled", void 0);
    return DeliverySummaryItemDto;
}((0, ts_mixer_1.Mixin)(baseDBFields_dto_1.BaseDBFieldsDto, deliverySummary_base_dto_1.DeliverySummaryBaseDto)));
exports.DeliverySummaryItemDto = DeliverySummaryItemDto;
//# sourceMappingURL=deliverySummary.item.dto.js.map