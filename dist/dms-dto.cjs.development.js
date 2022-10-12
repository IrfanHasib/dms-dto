'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var classValidator = require('class-validator');
var classTransformer = require('class-transformer');

(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType['ALL'] = 'ALL';
  BulkAdjustmentCountType['INDIVIDUAL'] = 'INDIVIDUAL';
})(exports.BulkAdjustmentCountType || (exports.BulkAdjustmentCountType = {}));

(function (BulkDiscountType) {
  BulkDiscountType['PERCENT'] = 'PERCENT';
  BulkDiscountType['FIXED'] = 'FIXED';
  BulkDiscountType['FIXED_PRICE_PER_ITEM'] = 'FIXED_PRICE_PER_ITEM';
})(exports.BulkDiscountType || (exports.BulkDiscountType = {}));

(function (BXGXDiscountType) {
  BXGXDiscountType['PERCENT'] = 'PERCENT';
  BXGXDiscountType['FIXED'] = 'FIXED';
  BXGXDiscountType['FREE'] = 'FREE';
})(exports.BXGXDiscountType || (exports.BXGXDiscountType = {}));

(function (BXGYCountType) {
  BXGYCountType['ALL'] = 'ALL';
  BXGYCountType['INDIVIDUAL'] = 'INDIVIDUAL';
})(exports.BXGYCountType || (exports.BXGYCountType = {}));

(function (BXGYDiscountType) {
  BXGYDiscountType['PERCENT'] = 'PERCENT';
  BXGYDiscountType['FIXED'] = 'FIXED';
  BXGYDiscountType['FREE'] = 'FREE';
})(exports.BXGYDiscountType || (exports.BXGYDiscountType = {}));

(function (BXGYGetType) {
  BXGYGetType['RANDOM'] = 'RANDOM';
  BXGYGetType['CHEAPEST_PRICE'] = 'CHEAPEST_PRICE';
  BXGYGetType['HIGHEST_PRICE'] = 'HIGHEST_PRICE';
})(exports.BXGYGetType || (exports.BXGYGetType = {}));

(function (BXGYType) {
  BXGYType['ALL'] = 'ALL';
  BXGYType['CATEGORIES'] = 'CATEGORIES';
  BXGYType['COMPANIES'] = 'COMPANIES';
  BXGYType['PRODUCTS'] = 'PRODUCTS';
})(exports.BXGYType || (exports.BXGYType = {}));

(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType['PERCENT'] = 'PERCENT';
  CartAdjustmentDiscountType['FIXED'] = 'FIXED';
  CartAdjustmentDiscountType['FIXED_PRICE_PER_PRODUCT'] = 'FIXED_PRICE_PER_PRODUCT';
})(exports.CartAdjustmentDiscountType || (exports.CartAdjustmentDiscountType = {}));

(function (ConditionCountType) {
  ConditionCountType['FROM_CART'] = 'FROM_CART';
  ConditionCountType['FROM_FILTER'] = 'FROM_FILTER';
})(exports.ConditionCountType || (exports.ConditionCountType = {}));

(function (ConditionOperator) {
  ConditionOperator['LESS_THAN'] = 'LESS_THAN';
  ConditionOperator['LESS_THAN_OR_EQUAL'] = 'LESS_THAN_OR_EQUAL';
  ConditionOperator['GREATER_THAN'] = 'GREATER_THAN';
  ConditionOperator['GREATER_THAN_OR_EQUAL'] = 'GREATER_THAN_OR_EQUAL';
  ConditionOperator['EQUAL_TO'] = 'EQUAL_TO';
})(exports.ConditionOperator || (exports.ConditionOperator = {}));

(function (DiscountConditionType) {
  DiscountConditionType['SUBTOTAL'] = 'SUBTOTAL';
  DiscountConditionType['ITEM_QUANTITY'] = 'ITEM_QUANTITY';
  DiscountConditionType['LINE_ITEM_COUNT'] = 'LINE_ITEM_COUNT';
})(exports.DiscountConditionType || (exports.DiscountConditionType = {}));

(function (DiscountType) {
  DiscountType['PRODUCT_ADJUSTMENT'] = 'PRODUCT_ADJUSTMENT';
  DiscountType['CART_ADJUSTMENT'] = 'CART_ADJUSTMENT';
  DiscountType['BULK_ADJUSTMENT'] = 'BULK_ADJUSTMENT';
  DiscountType['BXGX'] = 'BXGX';
  DiscountType['BXGY'] = 'BXGY';
})(exports.DiscountType || (exports.DiscountType = {}));

(function (ProductAdjustmentDiscountType) {
  ProductAdjustmentDiscountType['PERCENT'] = 'PERCENT';
  ProductAdjustmentDiscountType['FIXED'] = 'FIXED';
  ProductAdjustmentDiscountType['FIXED_PRICE_PER_ITEM'] = 'FIXED_PRICE_PER_ITEM';
})(exports.ProductAdjustmentDiscountType || (exports.ProductAdjustmentDiscountType = {}));

(function (DiscountFilterType) {
  DiscountFilterType['ALL'] = 'ALL';
  DiscountFilterType['PRODUCTS'] = 'PRODUCTS';
  DiscountFilterType['COMPANIES'] = 'COMPANIES';
  DiscountFilterType['CATEGORIES'] = 'CATEGORIES';
})(exports.DiscountFilterType || (exports.DiscountFilterType = {}));

var LoginDTO =
/*#__PURE__*/
/** @class */
function () {
  function LoginDTO() {}
  tslib.__decorate([classValidator.IsNotEmpty(), classValidator.Length(11, 11)], LoginDTO.prototype, 'mobile');
  tslib.__decorate([classValidator.IsNotEmpty(), classValidator.Length(6)], LoginDTO.prototype, 'password');
  return LoginDTO;
}();

var AuthResponseDTO =
/*#__PURE__*/
/** @class */
function () {
  function AuthResponseDTO() {}
  tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, 'accessToken');
  tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, 'expiresIn');
  tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, 'tokenType');
  tslib.__decorate([classValidator.IsOptional(), classValidator.IsString()], AuthResponseDTO.prototype, 'message');
  return AuthResponseDTO;
}();

var dtoValidator = function dtoValidator(dto, obj) {
  return tslib.__awaiter(void 0, void 0, void 0, function () {
    var objInstance, errors, returnError;
    return tslib.__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          objInstance = classTransformer.plainToClass(dto, obj);
          return [4 /*yield*/, classValidator.validate(objInstance)];
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
  return tslib.__awaiter(void 0, void 0, void 0, function () {
    var returnError;
    return tslib.__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, dtoValidator(dto, obj)];
        case 1:
          returnError = _a.sent();
          if (returnError.length > 0) {
            returnError = tslib.__spreadArray(['Response is not valid'], returnError, true);
            throw new Error(returnError === null || returnError === void 0 ? void 0 : returnError.join('. \n'));
          }
          return [2 /*return*/];
      }
    });
  });
};

exports.AuthResponseDTO = AuthResponseDTO;
exports.LoginDTO = LoginDTO;
exports.dtoValidator = dtoValidator;
exports.responseDtoValidator = responseDtoValidator;
//# sourceMappingURL=dms-dto.cjs.development.js.map
