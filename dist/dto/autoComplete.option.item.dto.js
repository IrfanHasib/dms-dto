import { __decorate, __metadata } from "tslib";
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import 'reflect-metadata';
var AutoCompleteOptionItemDto = /** @class */ (function () {
    function AutoCompleteOptionItemDto() {
    }
    __decorate([
        IsNotEmpty(),
        IsNumber(),
        __metadata("design:type", Number)
    ], AutoCompleteOptionItemDto.prototype, "id");
    __decorate([
        Allow(),
        __metadata("design:type", String)
    ], AutoCompleteOptionItemDto.prototype, "label");
    return AutoCompleteOptionItemDto;
}());
export { AutoCompleteOptionItemDto };
//# sourceMappingURL=autoComplete.option.item.dto.js.map