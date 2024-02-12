"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformBoolean = void 0;
require("reflect-metadata");
var class_transformer_1 = require("class-transformer");
function TransformBoolean() {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        if (typeof value === 'undefined' || value === null) {
            return false;
        }
        // Normalize the value to a lower-case string for case-insensitive comparison
        var stringValue = String(value).toLowerCase();
        return ['true', 'enabled', '1', 'yes'].includes(stringValue) || value === true;
    });
}
exports.TransformBoolean = TransformBoolean;
