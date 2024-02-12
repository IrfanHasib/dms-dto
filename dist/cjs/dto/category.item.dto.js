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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryItemDto = void 0;
var baseDBFields_dto_1 = require("./baseDBFields.dto");
var ts_mixer_1 = require("ts-mixer");
var category_create_dto_1 = require("./category.create.dto");
var CategoryItemDto = /** @class */ (function (_super) {
    __extends(CategoryItemDto, _super);
    function CategoryItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CategoryItemDto;
}((0, ts_mixer_1.Mixin)(baseDBFields_dto_1.BaseDBFieldsDto, category_create_dto_1.CategoryCreateDto)));
exports.CategoryItemDto = CategoryItemDto;
//# sourceMappingURL=category.item.dto.js.map