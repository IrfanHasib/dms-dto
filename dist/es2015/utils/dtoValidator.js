var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
/**
Obj should not be empty, if there are no field then pass {}
 */
const dtoValidator = (dto, obj) => __awaiter(void 0, void 0, void 0, function* () {
    let returnError = [];
    if (typeof obj !== 'object') {
        returnError.push('Received empty object');
    }
    const objInstance = plainToInstance(dto, obj, { exposeDefaultValues: true, enableImplicitConversion: true });
    // @ts-ignore
    const errors = yield validate(objInstance, {
        enableDebugMessages: true,
        whitelist: true,
        skipMissingProperties: false,
        transform: true,
    });
    if (errors.length > 0) {
        (function deepDive(e) {
            e === null || e === void 0 ? void 0 : e.map(({ constraints, children }) => {
                var _a, _b;
                if (constraints && ((_a = Object.keys(constraints)) === null || _a === void 0 ? void 0 : _a.length)) {
                    (_b = Object.values(constraints)) === null || _b === void 0 ? void 0 : _b.map(i => {
                        returnError.push(i);
                    });
                }
                if (children === null || children === void 0 ? void 0 : children.length) {
                    deepDive(children);
                }
            });
        })(errors);
    }
    return returnError;
});
export { dtoValidator };
//# sourceMappingURL=dtoValidator.js.map