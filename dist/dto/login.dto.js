import { __decorate, __metadata } from "tslib";
import { IsNotEmpty, Length } from 'class-validator';
import 'reflect-metadata';
var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        IsNotEmpty(),
        Length(11, 11),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "mobile");
    __decorate([
        IsNotEmpty(),
        Length(6),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "password");
    return LoginDTO;
}());
export { LoginDTO };
//# sourceMappingURL=login.dto.js.map