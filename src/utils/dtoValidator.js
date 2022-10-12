import { __awaiter, __generator } from 'tslib';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
var dtoValidator = function (dto, obj) {
  return __awaiter(void 0, void 0, void 0, function () {
    var objInstance, errors, returnError;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          objInstance = plainToClass(dto, obj);
          return [4 /*yield*/, validate(objInstance)];
        case 1:
          errors = _a.sent();
          returnError = [];
          if (errors.length > 0) {
            returnError.push('Response is not valid');
            errors === null || errors === void 0
              ? void 0
              : errors.map(function (_a) {
                  var _b;
                  var constraints = _a.constraints;
                  (_b = Object.values(constraints)) === null || _b === void 0
                    ? void 0
                    : _b.map(function (i) {
                        returnError.push(i);
                      });
                });
          }
          return [2 /*return*/, returnError];
      }
    });
  });
};
export { dtoValidator };
//# sourceMappingURL=dtoValidator.js.map
