import { __decorate } from 'tslib';
import { IsNotEmpty, Length } from 'class-validator';
var LoginDTO = /** @class */ (function () {
  function LoginDTO() {}
  __decorate([IsNotEmpty(), Length(11, 11)], LoginDTO.prototype, 'mobile');
  __decorate([IsNotEmpty(), Length(6)], LoginDTO.prototype, 'password');
  return LoginDTO;
})();
export { LoginDTO };
//# sourceMappingURL=login.dto.js.map
