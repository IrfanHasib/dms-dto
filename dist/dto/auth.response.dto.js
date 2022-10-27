import { __decorate, __metadata } from "tslib";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
var AuthResponseDTO = /** @class */ (function () {
    function AuthResponseDTO() {
    }
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "accessToken");
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "expiresIn");
    __decorate([
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "tokenType");
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "message");
    return AuthResponseDTO;
}());
export { AuthResponseDTO };
//# sourceMappingURL=auth.response.dto.js.map