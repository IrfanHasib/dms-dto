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
import { dtoValidator } from './dtoValidator';
const validateAndPaintToInstance = (dto, obj) => __awaiter(void 0, void 0, void 0, function* () {
    let returnError = yield dtoValidator(dto, obj);
    if (returnError.length > 0) {
        returnError = ['Response is not valid', ...returnError];
        throw new Error(returnError === null || returnError === void 0 ? void 0 : returnError.join('. \n'));
    }
    return plainToInstance(dto, obj, { exposeDefaultValues: true, enableImplicitConversion: true });
});
export { validateAndPaintToInstance };
//# sourceMappingURL=validateAndPaintToInstance.js.map