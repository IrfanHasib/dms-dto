import { __decorate } from 'tslib';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
var AuthResponseDTO = /** @class */ (function () {
  function AuthResponseDTO() {}
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'accessToken');
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'expiresIn');
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'tokenType');
  __decorate([IsOptional(), IsString()], AuthResponseDTO.prototype, 'message');
  return AuthResponseDTO;
})();
export { AuthResponseDTO };
//# sourceMappingURL=auth.response.dto.js.map
