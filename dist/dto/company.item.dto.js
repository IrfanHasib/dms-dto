import { __decorate, __extends, __metadata } from "tslib";
import 'reflect-metadata';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDBFieldsDto } from './../dto/baseDBFields.dto';
var CompanyItemDto = /** @class */ (function (_super) {
    __extends(CompanyItemDto, _super);
    function CompanyItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], CompanyItemDto.prototype, "name");
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CompanyItemDto.prototype, "logo");
    return CompanyItemDto;
}(BaseDBFieldsDto));
export { CompanyItemDto };
//# sourceMappingURL=company.item.dto.js.map