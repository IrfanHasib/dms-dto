'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var classValidator = require('class-validator');
var classTransformer = require('class-transformer');
require('reflect-metadata');

(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType["ALL"] = "ALL";
  BulkAdjustmentCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(exports.BulkAdjustmentCountType || (exports.BulkAdjustmentCountType = {}));

(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType["PERCENT"] = "PERCENT";
  CartAdjustmentDiscountType["FIXED"] = "FIXED";
  CartAdjustmentDiscountType["FIXED_PRICE_PER_PRODUCT"] = "FIXED_PRICE_PER_PRODUCT";
})(exports.CartAdjustmentDiscountType || (exports.CartAdjustmentDiscountType = {}));

var DiscountType;
(function (DiscountType) {
  DiscountType["PRODUCT_ADJUSTMENT"] = "PRODUCT_ADJUSTMENT";
  DiscountType["CART_ADJUSTMENT"] = "CART_ADJUSTMENT";
  DiscountType["BULK_ADJUSTMENT"] = "BULK_ADJUSTMENT";
  DiscountType["BXGX"] = "BXGX";
  DiscountType["BXGY"] = "BXGY";
})(DiscountType || (DiscountType = {}));

var ProductAdjustmentDiscountType;
(function (ProductAdjustmentDiscountType) {
  ProductAdjustmentDiscountType["PERCENT"] = "PERCENT";
  ProductAdjustmentDiscountType["FIXED"] = "FIXED";
  ProductAdjustmentDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(ProductAdjustmentDiscountType || (ProductAdjustmentDiscountType = {}));

(function (BXGYType) {
  BXGYType["ALL"] = "ALL";
  BXGYType["CATEGORIES"] = "CATEGORIES";
  BXGYType["COMPANIES"] = "COMPANIES";
  BXGYType["PRODUCTS"] = "PRODUCTS";
})(exports.BXGYType || (exports.BXGYType = {}));

(function (BXGYCountType) {
  BXGYCountType["ALL"] = "ALL";
  BXGYCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(exports.BXGYCountType || (exports.BXGYCountType = {}));

(function (BXGYGetType) {
  BXGYGetType["RANDOM"] = "RANDOM";
  BXGYGetType["CHEAPEST_PRICE"] = "CHEAPEST_PRICE";
  BXGYGetType["HIGHEST_PRICE"] = "HIGHEST_PRICE";
})(exports.BXGYGetType || (exports.BXGYGetType = {}));

(function (BulkDiscountType) {
  BulkDiscountType["PERCENT"] = "PERCENT";
  BulkDiscountType["FIXED"] = "FIXED";
  BulkDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(exports.BulkDiscountType || (exports.BulkDiscountType = {}));

var DiscountBulkItemDto = function DiscountBulkItemDto() {};
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classTransformer.Type(function () {
  return Number;
}), classValidator.IsNumber()], DiscountBulkItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBulkItemDto.prototype, "minimumQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBulkItemDto.prototype, "maximumQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.BulkDiscountType)], DiscountBulkItemDto.prototype, "discountType", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsDecimal()], DiscountBulkItemDto.prototype, "discountAmount", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], DiscountBulkItemDto.prototype, "label", void 0);

(function (BXGYDiscountType) {
  BXGYDiscountType["PERCENT"] = "PERCENT";
  BXGYDiscountType["FIXED"] = "FIXED";
  BXGYDiscountType["FREE"] = "FREE";
})(exports.BXGYDiscountType || (exports.BXGYDiscountType = {}));

var AutoCompleteOptionItemDto = function AutoCompleteOptionItemDto() {};
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsNumber()], AutoCompleteOptionItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.Allow()], AutoCompleteOptionItemDto.prototype, "label", void 0);

var DiscountBxgyItemDto = function DiscountBxgyItemDto() {};
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classTransformer.Type(function () {
  return Number;
}), classValidator.IsNumber()], DiscountBxgyItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "minimumQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "bonusQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.BXGYDiscountType)], DiscountBxgyItemDto.prototype, "discountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType !== exports.BXGYDiscountType.FREE;
}), classValidator.IsDecimal()], DiscountBxgyItemDto.prototype, "discountAmount", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsBoolean()], DiscountBxgyItemDto.prototype, "isBXGYRecursive", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.BXGYType)], DiscountBxgyItemDto.prototype, "BXGYType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return !o.isBXGYRecursive;
}), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "maximumQuantity", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.BXGYType === exports.BXGYType.PRODUCTS;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountBxgyItemDto.prototype, "products", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.BXGYType === exports.BXGYType.COMPANIES;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountBxgyItemDto.prototype, "companies", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.BXGYType === exports.BXGYType.CATEGORIES;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountBxgyItemDto.prototype, "categories", void 0);

(function (BXGXDiscountType) {
  BXGXDiscountType["PERCENT"] = "PERCENT";
  BXGXDiscountType["FIXED"] = "FIXED";
  BXGXDiscountType["FREE"] = "FREE";
})(exports.BXGXDiscountType || (exports.BXGXDiscountType = {}));

var DiscountBxgxItemDto = function DiscountBxgxItemDto() {};
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classTransformer.Type(function () {
  return Number;
}), classValidator.IsNumber()], DiscountBxgxItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "minimumQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "bonusQuantity", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.BXGXDiscountType)], DiscountBxgxItemDto.prototype, "discountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType !== exports.BXGXDiscountType.FREE;
}), classValidator.IsDecimal()], DiscountBxgxItemDto.prototype, "discountAmount", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsBoolean()], DiscountBxgxItemDto.prototype, "isBXGXRecursive", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return !o.isBXGXRecursive;
}), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "maximumQuantity", void 0);

var DiscountFilterType;
(function (DiscountFilterType) {
  DiscountFilterType["ALL"] = "ALL";
  DiscountFilterType["PRODUCTS"] = "PRODUCTS";
  DiscountFilterType["COMPANIES"] = "COMPANIES";
  DiscountFilterType["CATEGORIES"] = "CATEGORIES";
})(DiscountFilterType || (DiscountFilterType = {}));

var DiscountFilterItemDto = function DiscountFilterItemDto() {};
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classTransformer.Type(function () {
  return Number;
}), classValidator.IsNumber()], DiscountFilterItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(DiscountFilterType)], DiscountFilterItemDto.prototype, "discountFilterType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountFilterType !== DiscountFilterType.ALL;
}), classTransformer.Transform(function (_ref) {
  var value = _ref.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountFilterItemDto.prototype, "isInList", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.PRODUCTS;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountFilterItemDto.prototype, "products", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.COMPANIES;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountFilterItemDto.prototype, "companies", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.CATEGORIES;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return AutoCompleteOptionItemDto;
})], DiscountFilterItemDto.prototype, "categories", void 0);

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

var DiscountConditionItemDto = function DiscountConditionItemDto() {};
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classTransformer.Type(function () {
  return Number;
}), classValidator.IsNumber()], DiscountConditionItemDto.prototype, "id", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsDecimal()], DiscountConditionItemDto.prototype, "conditionValue", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.ConditionOperator)], DiscountConditionItemDto.prototype, "conditionOperator", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.DiscountConditionType)], DiscountConditionItemDto.prototype, "conditionType", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(exports.ConditionCountType)], DiscountConditionItemDto.prototype, "conditionCountType", void 0);

var DiscountBaseDto = function DiscountBaseDto() {};
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsString()], DiscountBaseDto.prototype, "name", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsEnum(DiscountType)], DiscountBaseDto.prototype, "discountType", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classTransformer.Transform(function (_ref) {
  var value = _ref.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isEnabled", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classTransformer.Transform(function (_ref2) {
  var value = _ref2.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isIgnoreOther", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classTransformer.Transform(function (_ref3) {
  var value = _ref3.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isIgnoreThisIfOtherMatched", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBaseDto.prototype, "priority", void 0);
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classValidator.IsInt(), classTransformer.Type(function () {
  return Number;
})], DiscountBaseDto.prototype, "usageLimit", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.PRODUCT_ADJUSTMENT;
}), classValidator.IsEnum(ProductAdjustmentDiscountType)], DiscountBaseDto.prototype, "productAdjustmentDiscountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.PRODUCT_ADJUSTMENT;
}), classValidator.IsDecimal()], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), classValidator.IsEnum(exports.CartAdjustmentDiscountType)], DiscountBaseDto.prototype, "cartAdjustmentDiscountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), classValidator.IsDecimal()], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), classValidator.IsString()], DiscountBaseDto.prototype, "cartAdjustmentLabel", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BULK_ADJUSTMENT;
}), classValidator.IsEnum(exports.BulkAdjustmentCountType)], DiscountBaseDto.prototype, "bulkAdjustmentCountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BULK_ADJUSTMENT;
}), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return DiscountBulkItemDto;
})], DiscountBaseDto.prototype, "discountBulks", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGX;
}), classTransformer.Transform(function (_ref4) {
  var value = _ref4.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGXRecursive", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGX;
}), classValidator.IsArray(), classValidator.ArrayMinSize(1), classTransformer.Transform(function (_ref5) {
  var _value$filter;
  var value = _ref5.value,
    obj = _ref5.obj;
  return value === null || value === void 0 ? void 0 : (_value$filter = value.filter(function (_valueObj, index) {
    return !(obj !== null && obj !== void 0 && obj.isBXGXRecursive) || index < 1;
  })) === null || _value$filter === void 0 ? void 0 : _value$filter.map(function (valueObj) {
    valueObj.isBXGXRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive;
    return valueObj;
  });
}), classTransformer.Type(function () {
  return DiscountBxgxItemDto;
}), classValidator.ValidateNested({
  each: true
})], DiscountBaseDto.prototype, "discountBXGXs", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), classValidator.IsEnum(exports.BXGYType)], DiscountBaseDto.prototype, "BXGYType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), classValidator.IsEnum(exports.BXGYCountType)], DiscountBaseDto.prototype, "BXGYCountType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), classValidator.IsEnum(exports.BXGYGetType)], DiscountBaseDto.prototype, "BXGYGetType", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), classTransformer.Transform(function (_ref6) {
  var value = _ref6.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGYRecursive", void 0);
tslib.__decorate([classValidator.ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), classValidator.IsArray(), classValidator.ArrayMinSize(1), classTransformer.Transform(function (_ref7) {
  var _value$filter2;
  var value = _ref7.value,
    obj = _ref7.obj;
  return value === null || value === void 0 ? void 0 : (_value$filter2 = value.filter(function (_valueObj, index) {
    return !(obj !== null && obj !== void 0 && obj.isBXGYRecursive) || index < 1;
  })) === null || _value$filter2 === void 0 ? void 0 : _value$filter2.map(function (valueObj) {
    valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
    valueObj.isBXGYRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive;
    return valueObj;
  });
}), classTransformer.Type(function () {
  return DiscountBxgyItemDto;
}), classValidator.ValidateNested({
  each: true
})], DiscountBaseDto.prototype, "discountBXGYs", void 0);
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classValidator.IsDateString()], DiscountBaseDto.prototype, "activeFromDateTime", void 0);
tslib.__decorate([classValidator.IsOptional(), classValidator.ValidateIf(function (_object, value) {
  return !!value;
}), classValidator.IsDateString()], DiscountBaseDto.prototype, "activeToDateTime", void 0);
tslib.__decorate([classValidator.IsNotEmpty(), classTransformer.Transform(function (_ref8) {
  var value = _ref8.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isMatchAllCondition", void 0);
tslib.__decorate([classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(1), classTransformer.Type(function () {
  return DiscountFilterItemDto;
})], DiscountBaseDto.prototype, "discountFilers", void 0);
tslib.__decorate([classValidator.IsOptional(), classValidator.IsArray(), classValidator.ValidateNested({
  each: true
}), classValidator.ArrayMinSize(0), classTransformer.Type(function () {
  return DiscountConditionItemDto;
})], DiscountBaseDto.prototype, "discountConditions", void 0);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

var DiscountCreateDto = /*#__PURE__*/function (_DiscountBaseDto) {
  _inheritsLoose(DiscountCreateDto, _DiscountBaseDto);
  function DiscountCreateDto() {
    return _DiscountBaseDto.apply(this, arguments) || this;
  }
  return DiscountCreateDto;
}(DiscountBaseDto);

var DiscountUpdateDto = /*#__PURE__*/function (_DiscountBaseDto) {
  _inheritsLoose(DiscountUpdateDto, _DiscountBaseDto);
  function DiscountUpdateDto() {
    return _DiscountBaseDto.apply(this, arguments) || this;
  }
  return DiscountUpdateDto;
}(DiscountBaseDto);

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
exports.AutoCompleteOptionItemDto = AutoCompleteOptionItemDto;
exports.DiscountBaseDto = DiscountBaseDto;
exports.DiscountBulkItemDto = DiscountBulkItemDto;
exports.DiscountBxgxItemDto = DiscountBxgxItemDto;
exports.DiscountBxgyItemDto = DiscountBxgyItemDto;
exports.DiscountConditionItemDto = DiscountConditionItemDto;
exports.DiscountCreateDto = DiscountCreateDto;
exports.DiscountFilterItemDto = DiscountFilterItemDto;
exports.DiscountUpdateDto = DiscountUpdateDto;
exports.LoginDTO = LoginDTO;
exports.dtoValidator = dtoValidator;
exports.responseDtoValidator = responseDtoValidator;
//# sourceMappingURL=dms-dto.cjs.development.js.map
