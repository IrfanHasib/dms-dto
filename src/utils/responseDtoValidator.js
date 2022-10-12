import { __awaiter, __generator, __spreadArray } from 'tslib';
import { dtoValidator } from './dtoValidator';
var responseDtoValidator = function (dto, obj) {
  return __awaiter(void 0, void 0, void 0, function () {
    var returnError;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, dtoValidator(dto, obj)];
        case 1:
          returnError = _a.sent();
          if (returnError.length > 0) {
            returnError = __spreadArray(['Response is not valid'], returnError, true);
            throw new Error(returnError === null || returnError === void 0 ? void 0 : returnError.join('. \n'));
          }
          return [2 /*return*/];
      }
    });
  });
};
export { responseDtoValidator };
//# sourceMappingURL=responseDtoValidator.js.map
