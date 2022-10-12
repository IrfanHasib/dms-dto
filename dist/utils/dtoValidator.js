"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dtoValidator = async (dto, obj) => {
    const objInstance = (0, class_transformer_1.plainToClass)(dto, obj);
    const errors = await (0, class_validator_1.validate)(objInstance);
    let returnError = [];
    if (errors.length > 0) {
        returnError.push('Response is not valid');
        errors === null || errors === void 0 ? void 0 : errors.map(({ constraints }) => {
            var _a;
            (_a = Object.values(constraints)) === null || _a === void 0 ? void 0 : _a.map(i => {
                returnError.push(i);
            });
        });
    }
    return returnError;
};
exports.dtoValidator = dtoValidator;
//# sourceMappingURL=dtoValidator.js.map