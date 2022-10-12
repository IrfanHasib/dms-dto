export { DiscountBaseDto } from 'dto/discount.base.dto';
export { DiscountBulkItemDto } from 'dto/discount.bulk.item.dto';
export { DiscountBxgxItemDto } from 'dto/discount.bxgx.item.dto';
export { DiscountBxgyItemDto } from 'dto/discount.bxgy.item.dto';
export { DiscountConditionItemDto } from 'dto/discount.condition.item.dto';
export { DiscountCreateDto } from 'dto/discount.create.dto';
export { DiscountFilterItemDto } from 'dto/discount.filter.item.dto';
export { DiscountListItemDto } from 'dto/discount.list.item.dto';
export { DiscountUpdateDto } from 'dto/discount.update.dto';
import { __decorate } from 'tslib';
import { IsNotEmpty, Length, IsString, IsOptional, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

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

export { AuthResponseDTO, BXGXDiscountType, BXGYCountType, BXGYDiscountType, BXGYGetType, BXGYType, BulkAdjustmentCountType, BulkDiscountType, CartAdjustmentDiscountType, ConditionCountType, ConditionOperator, DiscountConditionType, DiscountFilterType, DiscountType, LoginDTO, ProductAdjustmentDiscountType, dtoValidator, responseDtoValidator };
//# sourceMappingURL=dms-dto.esm.js.map
