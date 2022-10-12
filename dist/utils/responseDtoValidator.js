"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseDtoValidator = void 0;
const dtoValidator_1 = require("./dtoValidator");
const responseDtoValidator = async (dto, obj) => {
    let returnError = await (0, dtoValidator_1.dtoValidator)(dto, obj);
    if (returnError.length > 0) {
        returnError = ["Response is not valid", ...returnError];
        throw new Error(returnError === null || returnError === void 0 ? void 0 : returnError.join(". \n"));
    }
};
exports.responseDtoValidator = responseDtoValidator;
//# sourceMappingURL=responseDtoValidator.js.map