import { __decorate } from 'tslib';
import { IsOptional, ValidateIf, IsNumber, IsNotEmpty, IsInt, IsEnum, IsDecimal, IsString, IsBoolean, IsArray, ValidateNested, ArrayMinSize, IsDateString, Length, validate } from 'class-validator';
import { Type, Transform, plainToInstance } from 'class-transformer';

var BulkAdjustmentCountType;
(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType["ALL"] = "ALL";
  BulkAdjustmentCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BulkAdjustmentCountType || (BulkAdjustmentCountType = {}));

var CartAdjustmentDiscountType;
(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType["PERCENT"] = "PERCENT";
  CartAdjustmentDiscountType["FIXED"] = "FIXED";
  CartAdjustmentDiscountType["FIXED_PRICE_PER_PRODUCT"] = "FIXED_PRICE_PER_PRODUCT";
})(CartAdjustmentDiscountType || (CartAdjustmentDiscountType = {}));

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

var BXGYType;
(function (BXGYType) {
  BXGYType["ALL"] = "ALL";
  BXGYType["CATEGORIES"] = "CATEGORIES";
  BXGYType["COMPANIES"] = "COMPANIES";
  BXGYType["PRODUCTS"] = "PRODUCTS";
})(BXGYType || (BXGYType = {}));

var BXGYCountType;
(function (BXGYCountType) {
  BXGYCountType["ALL"] = "ALL";
  BXGYCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BXGYCountType || (BXGYCountType = {}));

var BXGYGetType;
(function (BXGYGetType) {
  BXGYGetType["RANDOM"] = "RANDOM";
  BXGYGetType["CHEAPEST_PRICE"] = "CHEAPEST_PRICE";
  BXGYGetType["HIGHEST_PRICE"] = "HIGHEST_PRICE";
})(BXGYGetType || (BXGYGetType = {}));

var BulkDiscountType;
(function (BulkDiscountType) {
  BulkDiscountType["PERCENT"] = "PERCENT";
  BulkDiscountType["FIXED"] = "FIXED";
  BulkDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(BulkDiscountType || (BulkDiscountType = {}));

var DiscountBulkItemDto = function DiscountBulkItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountBulkItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBulkItemDto.prototype, "minimumQuantity", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBulkItemDto.prototype, "maximumQuantity", void 0);
__decorate([IsNotEmpty(), IsEnum(BulkDiscountType)], DiscountBulkItemDto.prototype, "discountType", void 0);
__decorate([IsNotEmpty(), IsDecimal()], DiscountBulkItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsString()], DiscountBulkItemDto.prototype, "label", void 0);

var BXGYDiscountType;
(function (BXGYDiscountType) {
  BXGYDiscountType["PERCENT"] = "PERCENT";
  BXGYDiscountType["FIXED"] = "FIXED";
  BXGYDiscountType["FREE"] = "FREE";
})(BXGYDiscountType || (BXGYDiscountType = {}));

var DiscountListItemDto = function DiscountListItemDto() {};
__decorate([IsNotEmpty(), IsNumber()], DiscountListItemDto.prototype, "id", void 0);

var DiscountBxgyItemDto = function DiscountBxgyItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountBxgyItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "minimumQuantity", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "bonusQuantity", void 0);
__decorate([IsNotEmpty(), IsEnum(BXGYDiscountType)], DiscountBxgyItemDto.prototype, "discountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType !== BXGYDiscountType.FREE;
}), IsDecimal()], DiscountBxgyItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsBoolean()], DiscountBxgyItemDto.prototype, "isBXGYRecursive", void 0);
__decorate([IsNotEmpty(), IsEnum(BXGYType)], DiscountBxgyItemDto.prototype, "BXGYType", void 0);
__decorate([ValidateIf(function (o) {
  return !o.isBXGYRecursive;
}), IsInt(), Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "maximumQuantity", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType.PRODUCTS;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountBxgyItemDto.prototype, "products", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType.COMPANIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountBxgyItemDto.prototype, "companies", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType.CATEGORIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountBxgyItemDto.prototype, "categories", void 0);

var BXGXDiscountType;
(function (BXGXDiscountType) {
  BXGXDiscountType["PERCENT"] = "PERCENT";
  BXGXDiscountType["FIXED"] = "FIXED";
  BXGXDiscountType["FREE"] = "FREE";
})(BXGXDiscountType || (BXGXDiscountType = {}));

var DiscountBxgxItemDto = function DiscountBxgxItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountBxgxItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "minimumQuantity", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "bonusQuantity", void 0);
__decorate([IsNotEmpty(), IsEnum(BXGXDiscountType)], DiscountBxgxItemDto.prototype, "discountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType !== BXGXDiscountType.FREE;
}), IsDecimal()], DiscountBxgxItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsBoolean()], DiscountBxgxItemDto.prototype, "isBXGXRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return !o.isBXGXRecursive;
}), IsInt(), Type(function () {
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
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountFilterItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountFilterType)], DiscountFilterItemDto.prototype, "discountFilterType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType !== DiscountFilterType.ALL;
}), Transform(function (_ref) {
  var value = _ref.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountFilterItemDto.prototype, "isInList", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.PRODUCTS;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountFilterItemDto.prototype, "products", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.COMPANIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountFilterItemDto.prototype, "companies", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType.CATEGORIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto;
})], DiscountFilterItemDto.prototype, "categories", void 0);

var ConditionCountType;
(function (ConditionCountType) {
  ConditionCountType["FROM_CART"] = "FROM_CART";
  ConditionCountType["FROM_FILTER"] = "FROM_FILTER";
})(ConditionCountType || (ConditionCountType = {}));

var ConditionOperator;
(function (ConditionOperator) {
  ConditionOperator["LESS_THAN"] = "LESS_THAN";
  ConditionOperator["LESS_THAN_OR_EQUAL"] = "LESS_THAN_OR_EQUAL";
  ConditionOperator["GREATER_THAN"] = "GREATER_THAN";
  ConditionOperator["GREATER_THAN_OR_EQUAL"] = "GREATER_THAN_OR_EQUAL";
  ConditionOperator["EQUAL_TO"] = "EQUAL_TO";
})(ConditionOperator || (ConditionOperator = {}));

var DiscountConditionType;
(function (DiscountConditionType) {
  DiscountConditionType["SUBTOTAL"] = "SUBTOTAL";
  DiscountConditionType["ITEM_QUANTITY"] = "ITEM_QUANTITY";
  DiscountConditionType["LINE_ITEM_COUNT"] = "LINE_ITEM_COUNT";
})(DiscountConditionType || (DiscountConditionType = {}));

var DiscountConditionItemDto = function DiscountConditionItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountConditionItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsDecimal()], DiscountConditionItemDto.prototype, "conditionValue", void 0);
__decorate([IsNotEmpty(), IsEnum(ConditionOperator)], DiscountConditionItemDto.prototype, "conditionOperator", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountConditionType)], DiscountConditionItemDto.prototype, "conditionType", void 0);
__decorate([IsNotEmpty(), IsEnum(ConditionCountType)], DiscountConditionItemDto.prototype, "conditionCountType", void 0);

var DiscountBaseDto = function DiscountBaseDto() {};
__decorate([IsNotEmpty(), IsString()], DiscountBaseDto.prototype, "name", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountType)], DiscountBaseDto.prototype, "discountType", void 0);
__decorate([IsNotEmpty(), Transform(function (_ref) {
  var value = _ref.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isEnabled", void 0);
__decorate([IsNotEmpty(), Transform(function (_ref2) {
  var value = _ref2.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isIgnoreOther", void 0);
__decorate([IsNotEmpty(), Transform(function (_ref3) {
  var value = _ref3.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isIgnoreThisIfOtherMatched", void 0);
__decorate([IsNotEmpty(), IsInt(), Type(function () {
  return Number;
})], DiscountBaseDto.prototype, "priority", void 0);
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), IsInt(), Type(function () {
  return Number;
})], DiscountBaseDto.prototype, "usageLimit", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.PRODUCT_ADJUSTMENT;
}), IsEnum(ProductAdjustmentDiscountType)], DiscountBaseDto.prototype, "productAdjustmentDiscountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.PRODUCT_ADJUSTMENT;
}), IsDecimal()], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), IsEnum(CartAdjustmentDiscountType)], DiscountBaseDto.prototype, "cartAdjustmentDiscountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), IsDecimal()], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.CART_ADJUSTMENT;
}), IsString()], DiscountBaseDto.prototype, "cartAdjustmentLabel", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BULK_ADJUSTMENT;
}), IsEnum(BulkAdjustmentCountType)], DiscountBaseDto.prototype, "bulkAdjustmentCountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BULK_ADJUSTMENT;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountBulkItemDto;
})], DiscountBaseDto.prototype, "discountBulks", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGX;
}), Transform(function (_ref4) {
  var value = _ref4.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGXRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGX;
}), IsArray(), ArrayMinSize(1), Transform(function (_ref5) {
  var _value$filter;
  var value = _ref5.value,
    obj = _ref5.obj;
  return value === null || value === void 0 ? void 0 : (_value$filter = value.filter(function (_valueObj, index) {
    return !(obj !== null && obj !== void 0 && obj.isBXGXRecursive) || index < 1;
  })) === null || _value$filter === void 0 ? void 0 : _value$filter.map(function (valueObj) {
    valueObj.isBXGXRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive;
    return valueObj;
  });
}), Type(function () {
  return DiscountBxgxItemDto;
}), ValidateNested({
  each: true
})], DiscountBaseDto.prototype, "discountBXGXs", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), IsEnum(BXGYType)], DiscountBaseDto.prototype, "BXGYType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), IsEnum(BXGYCountType)], DiscountBaseDto.prototype, "BXGYCountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), IsEnum(BXGYGetType)], DiscountBaseDto.prototype, "BXGYGetType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), Transform(function (_ref6) {
  var value = _ref6.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGYRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType.BXGY;
}), IsArray(), ArrayMinSize(1), Transform(function (_ref7) {
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
}), Type(function () {
  return DiscountBxgyItemDto;
}), ValidateNested({
  each: true
})], DiscountBaseDto.prototype, "discountBXGYs", void 0);
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), IsDateString()], DiscountBaseDto.prototype, "activeFromDateTime", void 0);
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), IsDateString()], DiscountBaseDto.prototype, "activeToDateTime", void 0);
__decorate([IsNotEmpty(), Transform(function (_ref8) {
  var value = _ref8.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isMatchAllCondition", void 0);
__decorate([IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountFilterItemDto;
})], DiscountBaseDto.prototype, "discountFilers", void 0);
__decorate([IsOptional(), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(0), Type(function () {
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

var DiscountType$1;
(function (DiscountType) {
  DiscountType["PRODUCT_ADJUSTMENT"] = "PRODUCT_ADJUSTMENT";
  DiscountType["CART_ADJUSTMENT"] = "CART_ADJUSTMENT";
  DiscountType["BULK_ADJUSTMENT"] = "BULK_ADJUSTMENT";
  DiscountType["BXGX"] = "BXGX";
  DiscountType["BXGY"] = "BXGY";
})(DiscountType$1 || (DiscountType$1 = {}));

var ProductAdjustmentDiscountType$1;
(function (ProductAdjustmentDiscountType) {
  ProductAdjustmentDiscountType["PERCENT"] = "PERCENT";
  ProductAdjustmentDiscountType["FIXED"] = "FIXED";
  ProductAdjustmentDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(ProductAdjustmentDiscountType$1 || (ProductAdjustmentDiscountType$1 = {}));

var DiscountFilterType$1;
(function (DiscountFilterType) {
  DiscountFilterType["ALL"] = "ALL";
  DiscountFilterType["PRODUCTS"] = "PRODUCTS";
  DiscountFilterType["COMPANIES"] = "COMPANIES";
  DiscountFilterType["CATEGORIES"] = "CATEGORIES";
})(DiscountFilterType$1 || (DiscountFilterType$1 = {}));

var LoginDTO = function LoginDTO() {};
__decorate([IsNotEmpty(), Length(11, 11)], LoginDTO.prototype, "mobile", void 0);
__decorate([IsNotEmpty(), Length(6)], LoginDTO.prototype, "password", void 0);

var AuthResponseDTO = function AuthResponseDTO() {};
__decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, "accessToken", void 0);
__decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, "expiresIn", void 0);
__decorate([IsNotEmpty(), IsString()], AuthResponseDTO.prototype, "tokenType", void 0);
__decorate([IsOptional(), IsString()], AuthResponseDTO.prototype, "message", void 0);

var dtoValidator = function dtoValidator(dto, obj) {
  try {
    var objInstance = plainToInstance(dto, obj);
    return Promise.resolve(validate(objInstance)).then(function (errors) {
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
      return plainToInstance(dto, obj);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export { AuthResponseDTO, BXGXDiscountType, BXGYCountType, BXGYDiscountType, BXGYGetType, BXGYType, BulkAdjustmentCountType, BulkDiscountType, CartAdjustmentDiscountType, ConditionCountType, ConditionOperator, DiscountBaseDto, DiscountBulkItemDto, DiscountBxgxItemDto, DiscountBxgyItemDto, DiscountConditionItemDto, DiscountConditionType, DiscountCreateDto, DiscountFilterItemDto, DiscountFilterType$1 as DiscountFilterType, DiscountListItemDto, DiscountType$1 as DiscountType, DiscountUpdateDto, LoginDTO, ProductAdjustmentDiscountType$1 as ProductAdjustmentDiscountType, dtoValidator, responseDtoValidator };
//# sourceMappingURL=dms-dto.esm.js.map
