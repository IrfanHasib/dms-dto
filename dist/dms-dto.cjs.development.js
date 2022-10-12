'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var classValidator = require('class-validator');
var classTransformer = require('class-transformer');

(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType["ALL"] = "ALL";
  BulkAdjustmentCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(exports.BulkAdjustmentCountType || (exports.BulkAdjustmentCountType = {}));

(function (BulkDiscountType) {
  BulkDiscountType["PERCENT"] = "PERCENT";
  BulkDiscountType["FIXED"] = "FIXED";
  BulkDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(exports.BulkDiscountType || (exports.BulkDiscountType = {}));

(function (BXGXDiscountType) {
  BXGXDiscountType["PERCENT"] = "PERCENT";
  BXGXDiscountType["FIXED"] = "FIXED";
  BXGXDiscountType["FREE"] = "FREE";
})(exports.BXGXDiscountType || (exports.BXGXDiscountType = {}));

(function (BXGYCountType) {
  BXGYCountType["ALL"] = "ALL";
  BXGYCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(exports.BXGYCountType || (exports.BXGYCountType = {}));

(function (BXGYDiscountType) {
  BXGYDiscountType["PERCENT"] = "PERCENT";
  BXGYDiscountType["FIXED"] = "FIXED";
  BXGYDiscountType["FREE"] = "FREE";
})(exports.BXGYDiscountType || (exports.BXGYDiscountType = {}));

(function (BXGYGetType) {
  BXGYGetType["RANDOM"] = "RANDOM";
  BXGYGetType["CHEAPEST_PRICE"] = "CHEAPEST_PRICE";
  BXGYGetType["HIGHEST_PRICE"] = "HIGHEST_PRICE";
})(exports.BXGYGetType || (exports.BXGYGetType = {}));

(function (BXGYType) {
  BXGYType["ALL"] = "ALL";
  BXGYType["CATEGORIES"] = "CATEGORIES";
  BXGYType["COMPANIES"] = "COMPANIES";
  BXGYType["PRODUCTS"] = "PRODUCTS";
})(exports.BXGYType || (exports.BXGYType = {}));

(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType["PERCENT"] = "PERCENT";
  CartAdjustmentDiscountType["FIXED"] = "FIXED";
  CartAdjustmentDiscountType["FIXED_PRICE_PER_PRODUCT"] = "FIXED_PRICE_PER_PRODUCT";
})(exports.CartAdjustmentDiscountType || (exports.CartAdjustmentDiscountType = {}));

(function (ConditionCountType) {
  ConditionCountType["FROM_CART"] = "FROM_CART";
  ConditionCountType["FROM_FILTER"] = "FROM_FILTER";
})(exports.ConditionCountType || (exports.ConditionCountType = {}));

(function (ConditionOperator) {
  ConditionOperator["LESS_THAN"] = "LESS_THAN";
  ConditionOperator["LESS_THAN_OR_EQUAL"] = "LESS_THAN_OR_EQUAL";
  ConditionOperator["GREATER_THAN"] = "GREATER_THAN";
  ConditionOperator["GREATER_THAN_OR_EQUAL"] = "GREATER_THAN_OR_EQUAL";
  ConditionOperator["EQUAL_TO"] = "EQUAL_TO";
})(exports.ConditionOperator || (exports.ConditionOperator = {}));

(function (DiscountConditionType) {
  DiscountConditionType["SUBTOTAL"] = "SUBTOTAL";
  DiscountConditionType["ITEM_QUANTITY"] = "ITEM_QUANTITY";
  DiscountConditionType["LINE_ITEM_COUNT"] = "LINE_ITEM_COUNT";
})(exports.DiscountConditionType || (exports.DiscountConditionType = {}));

(function (DiscountType) {
  DiscountType["PRODUCT_ADJUSTMENT"] = "PRODUCT_ADJUSTMENT";
  DiscountType["CART_ADJUSTMENT"] = "CART_ADJUSTMENT";
  DiscountType["BULK_ADJUSTMENT"] = "BULK_ADJUSTMENT";
  DiscountType["BXGX"] = "BXGX";
  DiscountType["BXGY"] = "BXGY";
})(exports.DiscountType || (exports.DiscountType = {}));

(function (ProductAdjustmentDiscountType) {
  ProductAdjustmentDiscountType["PERCENT"] = "PERCENT";
  ProductAdjustmentDiscountType["FIXED"] = "FIXED";
  ProductAdjustmentDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(exports.ProductAdjustmentDiscountType || (exports.ProductAdjustmentDiscountType = {}));

(function (DiscountFilterType) {
  DiscountFilterType["ALL"] = "ALL";
  DiscountFilterType["PRODUCTS"] = "PRODUCTS";
  DiscountFilterType["COMPANIES"] = "COMPANIES";
  DiscountFilterType["CATEGORIES"] = "CATEGORIES";
})(exports.DiscountFilterType || (exports.DiscountFilterType = {}));

var LoginDTO = function LoginDTO() {};
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.Length(11, 11)], LoginDTO.prototype, "mobile", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.Length(6)], LoginDTO.prototype, "password", void 0);

var AuthResponseDTO = function AuthResponseDTO() {};
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, "accessToken", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, "expiresIn", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], AuthResponseDTO.prototype, "tokenType", void 0);
tslib.__decorate([classValidator.IsOptional(), classValidator.IsString()], AuthResponseDTO.prototype, "message", void 0);

var dtoValidator = function dtoValidator(dto, obj) {
  try {
    var objInstance = classTransformer.plainToInstance(dto, obj);
    return Promise.resolve(classValidator.validate(objInstance)).then(function (errors) {
      var returnError = [];
      if (errors.length > 0) {
        returnError.push('Response is not valid');
        errors === null || errors === void 0 ? void 0 : errors.map(function (_ref) {
          var _Object$values;
          var constraints = _ref.constraints;
          (_Object$values = Object.values(constraints)) === null || _Object$values === void 0 ? void 0 : _Object$values.map(function (i) {
            returnError.push(i);
          });
        });
      }
      return returnError;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var responseDtoValidator = function responseDtoValidator(dto, obj) {
  try {
    return Promise.resolve(dtoValidator(dto, obj)).then(function (returnError) {
      if (returnError.length > 0) {
        var _returnError;
        returnError = ['Response is not valid'].concat(returnError);
        throw new Error((_returnError = returnError) === null || _returnError === void 0 ? void 0 : _returnError.join('. \n'));
      }
      return classTransformer.plainToInstance(dto, obj);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.AuthResponseDTO = AuthResponseDTO;
exports.LoginDTO = LoginDTO;
exports.dtoValidator = dtoValidator;
exports.responseDtoValidator = responseDtoValidator;
//# sourceMappingURL=dms-dto.cjs.development.js.map
