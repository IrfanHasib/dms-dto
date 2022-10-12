import { __decorate, __awaiter, __generator, __spreadArray } from 'tslib';
import { IsNotEmpty, Length, IsString, IsOptional, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

var BulkAdjustmentCountType;
(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType['ALL'] = 'ALL';
  BulkAdjustmentCountType['INDIVIDUAL'] = 'INDIVIDUAL';
})(BulkAdjustmentCountType || (BulkAdjustmentCountType = {}));

var BulkDiscountType;
(function (BulkDiscountType) {
  BulkDiscountType['PERCENT'] = 'PERCENT';
  BulkDiscountType['FIXED'] = 'FIXED';
  BulkDiscountType['FIXED_PRICE_PER_ITEM'] = 'FIXED_PRICE_PER_ITEM';
})(BulkDiscountType || (BulkDiscountType = {}));

var BXGXDiscountType;
(function (BXGXDiscountType) {
  BXGXDiscountType['PERCENT'] = 'PERCENT';
  BXGXDiscountType['FIXED'] = 'FIXED';
  BXGXDiscountType['FREE'] = 'FREE';
})(BXGXDiscountType || (BXGXDiscountType = {}));

var BXGYCountType;
(function (BXGYCountType) {
  BXGYCountType['ALL'] = 'ALL';
  BXGYCountType['INDIVIDUAL'] = 'INDIVIDUAL';
})(BXGYCountType || (BXGYCountType = {}));

var BXGYDiscountType;
(function (BXGYDiscountType) {
  BXGYDiscountType['PERCENT'] = 'PERCENT';
  BXGYDiscountType['FIXED'] = 'FIXED';
  BXGYDiscountType['FREE'] = 'FREE';
})(BXGYDiscountType || (BXGYDiscountType = {}));

var BXGYGetType;
(function (BXGYGetType) {
  BXGYGetType['RANDOM'] = 'RANDOM';
  BXGYGetType['CHEAPEST_PRICE'] = 'CHEAPEST_PRICE';
  BXGYGetType['HIGHEST_PRICE'] = 'HIGHEST_PRICE';
})(BXGYGetType || (BXGYGetType = {}));

var BXGYType;
(function (BXGYType) {
  BXGYType['ALL'] = 'ALL';
  BXGYType['CATEGORIES'] = 'CATEGORIES';
  BXGYType['COMPANIES'] = 'COMPANIES';
  BXGYType['PRODUCTS'] = 'PRODUCTS';
})(BXGYType || (BXGYType = {}));

var CartAdjustmentDiscountType;
(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType['PERCENT'] = 'PERCENT';
  CartAdjustmentDiscountType['FIXED'] = 'FIXED';
  CartAdjustmentDiscountType['FIXED_PRICE_PER_PRODUCT'] = 'FIXED_PRICE_PER_PRODUCT';
})(CartAdjustmentDiscountType || (CartAdjustmentDiscountType = {}));

var ConditionCountType;
(function (ConditionCountType) {
  ConditionCountType['FROM_CART'] = 'FROM_CART';
  ConditionCountType['FROM_FILTER'] = 'FROM_FILTER';
})(ConditionCountType || (ConditionCountType = {}));

var ConditionOperator;
(function (ConditionOperator) {
  ConditionOperator['LESS_THAN'] = 'LESS_THAN';
  ConditionOperator['LESS_THAN_OR_EQUAL'] = 'LESS_THAN_OR_EQUAL';
  ConditionOperator['GREATER_THAN'] = 'GREATER_THAN';
  ConditionOperator['GREATER_THAN_OR_EQUAL'] = 'GREATER_THAN_OR_EQUAL';
  ConditionOperator['EQUAL_TO'] = 'EQUAL_TO';
})(ConditionOperator || (ConditionOperator = {}));

var DiscountConditionType;
(function (DiscountConditionType) {
  DiscountConditionType['SUBTOTAL'] = 'SUBTOTAL';
  DiscountConditionType['ITEM_QUANTITY'] = 'ITEM_QUANTITY';
  DiscountConditionType['LINE_ITEM_COUNT'] = 'LINE_ITEM_COUNT';
})(DiscountConditionType || (DiscountConditionType = {}));

var DiscountType;
(function (DiscountType) {
  DiscountType['PRODUCT_ADJUSTMENT'] = 'PRODUCT_ADJUSTMENT';
  DiscountType['CART_ADJUSTMENT'] = 'CART_ADJUSTMENT';
  DiscountType['BULK_ADJUSTMENT'] = 'BULK_ADJUSTMENT';
  DiscountType['BXGX'] = 'BXGX';
  DiscountType['BXGY'] = 'BXGY';
})(DiscountType || (DiscountType = {}));

var ProductAdjustmentDiscountType;
(function (ProductAdjustmentDiscountType) {
  ProductAdjustmentDiscountType['PERCENT'] = 'PERCENT';
  ProductAdjustmentDiscountType['FIXED'] = 'FIXED';
  ProductAdjustmentDiscountType['FIXED_PRICE_PER_ITEM'] = 'FIXED_PRICE_PER_ITEM';
})(ProductAdjustmentDiscountType || (ProductAdjustmentDiscountType = {}));

var DiscountFilterType;
(function (DiscountFilterType) {
  DiscountFilterType['ALL'] = 'ALL';
  DiscountFilterType['PRODUCTS'] = 'PRODUCTS';
  DiscountFilterType['COMPANIES'] = 'COMPANIES';
  DiscountFilterType['CATEGORIES'] = 'CATEGORIES';
})(DiscountFilterType || (DiscountFilterType = {}));

var LoginDTO =
/*#__PURE__*/
/** @class */
function () {
  function LoginDTO() {}
  __decorate([IsNotEmpty(), Length(11, 11)], LoginDTO.prototype, 'mobile');
  __decorate([IsNotEmpty(), Length(6)], LoginDTO.prototype, 'password');
  return LoginDTO;
}();

var AuthResponseDTO =
/*#__PURE__*/
/** @class */
function () {
  function AuthResponseDTO() {}
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'accessToken');
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'expiresIn');
  __decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, 'tokenType');
  __decorate([IsOptional(), IsString()], AuthResponseDTO.prototype, 'message');
  return AuthResponseDTO;
}();

var dtoValidator = function dtoValidator(dto, obj) {
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
            errors === null || errors === void 0 ? void 0 : errors.map(function (_a) {
              var _b;
              var constraints = _a.constraints;
              (_b = Object.values(constraints)) === null || _b === void 0 ? void 0 : _b.map(function (i) {
                returnError.push(i);
              });
            });
          }
          return [2 /*return*/, returnError];
      }
    });
  });
};

var responseDtoValidator = function responseDtoValidator(dto, obj) {
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

export { AuthResponseDTO, BXGXDiscountType, BXGYCountType, BXGYDiscountType, BXGYGetType, BXGYType, BulkAdjustmentCountType, BulkDiscountType, CartAdjustmentDiscountType, ConditionCountType, ConditionOperator, DiscountConditionType, DiscountFilterType, DiscountType, LoginDTO, ProductAdjustmentDiscountType, dtoValidator, responseDtoValidator };
//# sourceMappingURL=dms-dto.esm.js.map
