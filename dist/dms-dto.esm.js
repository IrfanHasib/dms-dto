import { __decorate } from 'tslib';
import { IsNotEmpty, IsString, IsEnum, IsInt, IsOptional, ValidateIf, IsDecimal, IsArray, ValidateNested, ArrayMinSize, IsDateString, IsNumber, IsBoolean, Length, validate } from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { BulkAdjustmentCountType as BulkAdjustmentCountType$1 } from 'enum/bulkAdjustmentCountType';
import { CartAdjustmentDiscountType as CartAdjustmentDiscountType$1 } from 'enum/cartAdjustmentDiscountType';
import { DiscountType as DiscountType$1 } from 'enum/discountType';
import { ProductAdjustmentDiscountType as ProductAdjustmentDiscountType$1 } from 'enum/productAdjustmentDiscountType';
import { BXGYType as BXGYType$1 } from 'enum/BXGYType';
import { BXGYCountType as BXGYCountType$1 } from 'enum/BXGYCountType';
import { BXGYGetType as BXGYGetType$1 } from 'enum/BXGYGetType';
import { DiscountBulkItemDto as DiscountBulkItemDto$1 } from 'dto/discount.bulk.item.dto';
import { DiscountBxgyItemDto as DiscountBxgyItemDto$1 } from 'dto/discount.bxgy.item.dto';
import { DiscountBxgxItemDto as DiscountBxgxItemDto$1 } from 'dto/discount.bxgx.item.dto';
import { DiscountFilterItemDto as DiscountFilterItemDto$1 } from 'dto/discount.filter.item.dto';
import { DiscountConditionItemDto as DiscountConditionItemDto$1 } from 'dto/discount.condition.item.dto';
import { BulkDiscountType as BulkDiscountType$1 } from 'enum/bulkDiscountType';
import { BXGXDiscountType as BXGXDiscountType$1 } from 'enum/BXGXDiscountType';
import { BXGYDiscountType as BXGYDiscountType$1 } from 'enum/BXGYDiscountType';
import { DiscountListItemDto as DiscountListItemDto$1 } from 'dto/discount.list.item.dto';
import { DiscountConditionType as DiscountConditionType$1 } from 'enum/discountConditionType';
import { DiscountBaseDto as DiscountBaseDto$1 } from 'dto/discount.base.dto';
import { DiscountFilterType as DiscountFilterType$1 } from 'enum/discountFilterType';

var DiscountBaseDto = function DiscountBaseDto() {};
__decorate([IsNotEmpty(), IsString()], DiscountBaseDto.prototype, "name", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountType$1)], DiscountBaseDto.prototype, "discountType", void 0);
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
  return o.discountType === DiscountType$1.PRODUCT_ADJUSTMENT;
}), IsEnum(ProductAdjustmentDiscountType$1)], DiscountBaseDto.prototype, "productAdjustmentDiscountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.PRODUCT_ADJUSTMENT;
}), IsDecimal()], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.CART_ADJUSTMENT;
}), IsEnum(CartAdjustmentDiscountType$1)], DiscountBaseDto.prototype, "cartAdjustmentDiscountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.CART_ADJUSTMENT;
}), IsDecimal()], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.CART_ADJUSTMENT;
}), IsString()], DiscountBaseDto.prototype, "cartAdjustmentLabel", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BULK_ADJUSTMENT;
}), IsEnum(BulkAdjustmentCountType$1)], DiscountBaseDto.prototype, "bulkAdjustmentCountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BULK_ADJUSTMENT;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountBulkItemDto$1;
})], DiscountBaseDto.prototype, "discountBulks", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGX;
}), Transform(function (_ref4) {
  var value = _ref4.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGXRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGX;
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
  return DiscountBxgxItemDto$1;
}), ValidateNested({
  each: true
})], DiscountBaseDto.prototype, "discountBXGXs", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGY;
}), IsEnum(BXGYType$1)], DiscountBaseDto.prototype, "BXGYType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGY;
}), IsEnum(BXGYCountType$1)], DiscountBaseDto.prototype, "BXGYCountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGY;
}), IsEnum(BXGYGetType$1)], DiscountBaseDto.prototype, "BXGYGetType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGY;
}), Transform(function (_ref6) {
  var value = _ref6.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountBaseDto.prototype, "isBXGYRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType === DiscountType$1.BXGY;
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
  return DiscountBxgyItemDto$1;
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
  return DiscountFilterItemDto$1;
})], DiscountBaseDto.prototype, "discountFilers", void 0);
__decorate([IsOptional(), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(0), Type(function () {
  return DiscountConditionItemDto$1;
})], DiscountBaseDto.prototype, "discountConditions", void 0);

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
__decorate([IsNotEmpty(), IsEnum(BulkDiscountType$1)], DiscountBulkItemDto.prototype, "discountType", void 0);
__decorate([IsNotEmpty(), IsDecimal()], DiscountBulkItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsString()], DiscountBulkItemDto.prototype, "label", void 0);

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
__decorate([IsNotEmpty(), IsEnum(BXGXDiscountType$1)], DiscountBxgxItemDto.prototype, "discountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType !== BXGXDiscountType$1.FREE;
}), IsDecimal()], DiscountBxgxItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsBoolean()], DiscountBxgxItemDto.prototype, "isBXGXRecursive", void 0);
__decorate([ValidateIf(function (o) {
  return !o.isBXGXRecursive;
}), IsInt(), Type(function () {
  return Number;
})], DiscountBxgxItemDto.prototype, "maximumQuantity", void 0);

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
__decorate([IsNotEmpty(), IsEnum(BXGYDiscountType$1)], DiscountBxgyItemDto.prototype, "discountType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountType !== BXGYDiscountType$1.FREE;
}), IsDecimal()], DiscountBxgyItemDto.prototype, "discountAmount", void 0);
__decorate([IsNotEmpty(), IsBoolean()], DiscountBxgyItemDto.prototype, "isBXGYRecursive", void 0);
__decorate([IsNotEmpty(), IsEnum(BXGYType$1)], DiscountBxgyItemDto.prototype, "BXGYType", void 0);
__decorate([ValidateIf(function (o) {
  return !o.isBXGYRecursive;
}), IsInt(), Type(function () {
  return Number;
})], DiscountBxgyItemDto.prototype, "maximumQuantity", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType$1.PRODUCTS;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountBxgyItemDto.prototype, "products", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType$1.COMPANIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountBxgyItemDto.prototype, "companies", void 0);
__decorate([ValidateIf(function (o) {
  return o.BXGYType === BXGYType$1.CATEGORIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountBxgyItemDto.prototype, "categories", void 0);

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

var DiscountConditionItemDto = function DiscountConditionItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountConditionItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsDecimal()], DiscountConditionItemDto.prototype, "conditionValue", void 0);
__decorate([IsNotEmpty(), IsEnum(ConditionOperator)], DiscountConditionItemDto.prototype, "conditionOperator", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountConditionType$1)], DiscountConditionItemDto.prototype, "conditionType", void 0);
__decorate([IsNotEmpty(), IsEnum(ConditionCountType)], DiscountConditionItemDto.prototype, "conditionCountType", void 0);

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
}(DiscountBaseDto$1);

var DiscountFilterItemDto = function DiscountFilterItemDto() {};
__decorate([IsOptional(), ValidateIf(function (_object, value) {
  return !!value;
}), Type(function () {
  return Number;
}), IsNumber()], DiscountFilterItemDto.prototype, "id", void 0);
__decorate([IsNotEmpty(), IsEnum(DiscountFilterType$1)], DiscountFilterItemDto.prototype, "discountFilterType", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType !== DiscountFilterType$1.ALL;
}), Transform(function (_ref) {
  var value = _ref.value;
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
})], DiscountFilterItemDto.prototype, "isInList", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType$1.PRODUCTS;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountFilterItemDto.prototype, "products", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType$1.COMPANIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountFilterItemDto.prototype, "companies", void 0);
__decorate([ValidateIf(function (o) {
  return o.discountFilterType === DiscountFilterType$1.CATEGORIES;
}), IsArray(), ValidateNested({
  each: true
}), ArrayMinSize(1), Type(function () {
  return DiscountListItemDto$1;
})], DiscountFilterItemDto.prototype, "categories", void 0);

var DiscountListItemDto = function DiscountListItemDto() {};
__decorate([IsNotEmpty(), IsNumber()], DiscountListItemDto.prototype, "id", void 0);

var DiscountUpdateDto = /*#__PURE__*/function (_DiscountBaseDto) {
  _inheritsLoose(DiscountUpdateDto, _DiscountBaseDto);
  function DiscountUpdateDto() {
    return _DiscountBaseDto.apply(this, arguments) || this;
  }
  return DiscountUpdateDto;
}(DiscountBaseDto$1);

var BulkAdjustmentCountType;
(function (BulkAdjustmentCountType) {
  BulkAdjustmentCountType["ALL"] = "ALL";
  BulkAdjustmentCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BulkAdjustmentCountType || (BulkAdjustmentCountType = {}));

var BulkDiscountType;
(function (BulkDiscountType) {
  BulkDiscountType["PERCENT"] = "PERCENT";
  BulkDiscountType["FIXED"] = "FIXED";
  BulkDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(BulkDiscountType || (BulkDiscountType = {}));

var BXGXDiscountType;
(function (BXGXDiscountType) {
  BXGXDiscountType["PERCENT"] = "PERCENT";
  BXGXDiscountType["FIXED"] = "FIXED";
  BXGXDiscountType["FREE"] = "FREE";
})(BXGXDiscountType || (BXGXDiscountType = {}));

var BXGYCountType;
(function (BXGYCountType) {
  BXGYCountType["ALL"] = "ALL";
  BXGYCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BXGYCountType || (BXGYCountType = {}));

var BXGYDiscountType;
(function (BXGYDiscountType) {
  BXGYDiscountType["PERCENT"] = "PERCENT";
  BXGYDiscountType["FIXED"] = "FIXED";
  BXGYDiscountType["FREE"] = "FREE";
})(BXGYDiscountType || (BXGYDiscountType = {}));

var BXGYGetType;
(function (BXGYGetType) {
  BXGYGetType["RANDOM"] = "RANDOM";
  BXGYGetType["CHEAPEST_PRICE"] = "CHEAPEST_PRICE";
  BXGYGetType["HIGHEST_PRICE"] = "HIGHEST_PRICE";
})(BXGYGetType || (BXGYGetType = {}));

var BXGYType;
(function (BXGYType) {
  BXGYType["ALL"] = "ALL";
  BXGYType["CATEGORIES"] = "CATEGORIES";
  BXGYType["COMPANIES"] = "COMPANIES";
  BXGYType["PRODUCTS"] = "PRODUCTS";
})(BXGYType || (BXGYType = {}));

var CartAdjustmentDiscountType;
(function (CartAdjustmentDiscountType) {
  CartAdjustmentDiscountType["PERCENT"] = "PERCENT";
  CartAdjustmentDiscountType["FIXED"] = "FIXED";
  CartAdjustmentDiscountType["FIXED_PRICE_PER_PRODUCT"] = "FIXED_PRICE_PER_PRODUCT";
})(CartAdjustmentDiscountType || (CartAdjustmentDiscountType = {}));

var DiscountConditionType;
(function (DiscountConditionType) {
  DiscountConditionType["SUBTOTAL"] = "SUBTOTAL";
  DiscountConditionType["ITEM_QUANTITY"] = "ITEM_QUANTITY";
  DiscountConditionType["LINE_ITEM_COUNT"] = "LINE_ITEM_COUNT";
})(DiscountConditionType || (DiscountConditionType = {}));

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

var DiscountFilterType;
(function (DiscountFilterType) {
  DiscountFilterType["ALL"] = "ALL";
  DiscountFilterType["PRODUCTS"] = "PRODUCTS";
  DiscountFilterType["COMPANIES"] = "COMPANIES";
  DiscountFilterType["CATEGORIES"] = "CATEGORIES";
})(DiscountFilterType || (DiscountFilterType = {}));

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

export { AuthResponseDTO, BXGXDiscountType, BXGYCountType, BXGYDiscountType, BXGYGetType, BXGYType, BulkAdjustmentCountType, BulkDiscountType, CartAdjustmentDiscountType, ConditionCountType, ConditionOperator, DiscountBaseDto, DiscountBulkItemDto, DiscountBxgxItemDto, DiscountBxgyItemDto, DiscountConditionItemDto, DiscountConditionType, DiscountCreateDto, DiscountFilterItemDto, DiscountFilterType, DiscountListItemDto, DiscountType, DiscountUpdateDto, LoginDTO, ProductAdjustmentDiscountType, dtoValidator, responseDtoValidator };
//# sourceMappingURL=dms-dto.esm.js.map
