"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBaseDto = void 0;
var class_validator_1 = require("class-validator");
var ts_mixer_1 = require("ts-mixer");
var class_transformer_1 = require("class-transformer");
var UserType_1 = require("../enum/UserType");
var DMSRole_1 = require("../enum/DMSRole");
var organizationRole_1 = require("../enum/organizationRole");
var UserBaseDto = /** @class */ (function () {
    function UserBaseDto() {
    }
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], UserBaseDto.prototype, "name", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Length)(11, 11),
        (0, class_validator_1.IsMobilePhone)('bn-BD')
    ], UserBaseDto.prototype, "mobile", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (object, value) { return !!value; }),
        (0, class_validator_1.IsEmail)()
    ], UserBaseDto.prototype, "email", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateIf)(function (object, value) { return !!value; }),
        (0, class_validator_1.IsString)()
    ], UserBaseDto.prototype, "address", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(UserType_1.UserType)
    ], UserBaseDto.prototype, "userType", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.ValidateIf)(function (o) { return o.userType === UserType_1.UserType.DMS_USER; }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(DMSRole_1.DMSRole)
    ], UserBaseDto.prototype, "dmsRole", void 0);
    __decorate([
        (0, ts_mixer_1.decorate)((0, class_transformer_1.Expose)()),
        (0, class_validator_1.ValidateIf)(function (o) { return o.userType === UserType_1.UserType.ORGANIZATION_USER; }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(organizationRole_1.OrganizationRole)
    ], UserBaseDto.prototype, "organizationRole", void 0);
    return UserBaseDto;
}());
exports.UserBaseDto = UserBaseDto;
