"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const dtoValidator = async (dto, obj) => {
    const objInstance = (0, class_transformer_1.plainToClass)(dto, obj);
    const errors = await (0, class_validator_1.validate)(objInstance);
    if (errors.length > 0) {
        throw new common_1.HttpException({
            error: `validation failed. The error fields : ${errors.map(({ property }) => property)}`
        }, 401);
    }
};
exports.dtoValidator = dtoValidator;
//# sourceMappingURL=dtoValidator.js.map