import { __awaiter, __generator } from "tslib";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
/**
Obj should not be empty, if there are no field then pass {}
 */
var dtoValidator = function (dto, obj) { return __awaiter(void 0, void 0, void 0, function () {
    var returnError, objInstance, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                returnError = [];
                if (typeof obj !== 'object') {
                    returnError.push('Received empty object');
                }
                objInstance = plainToInstance(dto, obj, { exposeDefaultValues: true, enableImplicitConversion: true });
                return [4 /*yield*/, validate(objInstance, {
                        enableDebugMessages: true,
                        whitelist: true,
                        skipMissingProperties: false,
                        transform: true
                    })];
            case 1:
                errors = _a.sent();
                if (errors.length > 0) {
                    (function deepDive(e) {
                        e === null || e === void 0 ? void 0 : e.map(function (_a) {
                            var _b, _c;
                            var constraints = _a.constraints, children = _a.children;
                            if (constraints && ((_b = Object.keys(constraints)) === null || _b === void 0 ? void 0 : _b.length)) {
                                (_c = Object.values(constraints)) === null || _c === void 0 ? void 0 : _c.map(function (i) {
                                    returnError.push(i);
                                });
                            }
                            if (children === null || children === void 0 ? void 0 : children.length) {
                                deepDive(children);
                            }
                        });
                    })(errors);
                }
                return [2 /*return*/, returnError];
        }
    });
}); };
export { dtoValidator };
//# sourceMappingURL=dtoValidator.js.map