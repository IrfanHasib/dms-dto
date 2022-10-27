"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidator = exports.validateAndPaintToInstance = exports.PaginateRequestDto = exports.PaginateResponseMetadataDto = exports.CompanyPaginateResponseDto = exports.CompanyItemDto = exports.BaseDBFieldsDto = exports.AuthResponseDTO = exports.LoginDTO = exports.DiscountFilterType = exports.ProductAdjustmentDiscountType = exports.DiscountType = exports.DiscountConditionType = exports.ConditionOperator = exports.ConditionCountType = exports.CartAdjustmentDiscountType = exports.BXGYType = exports.BXGYGetType = exports.BXGYDiscountType = exports.BXGYCountType = exports.BXGXDiscountType = exports.BulkDiscountType = exports.BulkAdjustmentCountType = exports.DiscountUpdateDto = exports.AutoCompleteOptionItemDto = exports.DiscountFilterItemDto = exports.DiscountCreateDto = exports.DiscountConditionItemDto = exports.DiscountBxgyItemDto = exports.DiscountBxgxItemDto = exports.DiscountBulkItemDto = exports.DiscountBaseDto = void 0;
require("reflect-metadata");
var discount_base_dto_1 = require("./dto/discount.base.dto");
Object.defineProperty(exports, "DiscountBaseDto", { enumerable: true, get: function () { return discount_base_dto_1.DiscountBaseDto; } });
var discount_bulk_item_dto_1 = require("./dto/discount.bulk.item.dto");
Object.defineProperty(exports, "DiscountBulkItemDto", { enumerable: true, get: function () { return discount_bulk_item_dto_1.DiscountBulkItemDto; } });
var discount_bxgx_item_dto_1 = require("./dto/discount.bxgx.item.dto");
Object.defineProperty(exports, "DiscountBxgxItemDto", { enumerable: true, get: function () { return discount_bxgx_item_dto_1.DiscountBxgxItemDto; } });
var discount_bxgy_item_dto_1 = require("./dto/discount.bxgy.item.dto");
Object.defineProperty(exports, "DiscountBxgyItemDto", { enumerable: true, get: function () { return discount_bxgy_item_dto_1.DiscountBxgyItemDto; } });
var discount_condition_item_dto_1 = require("./dto/discount.condition.item.dto");
Object.defineProperty(exports, "DiscountConditionItemDto", { enumerable: true, get: function () { return discount_condition_item_dto_1.DiscountConditionItemDto; } });
var discount_create_dto_1 = require("./dto/discount.create.dto");
Object.defineProperty(exports, "DiscountCreateDto", { enumerable: true, get: function () { return discount_create_dto_1.DiscountCreateDto; } });
var discount_filter_item_dto_1 = require("./dto/discount.filter.item.dto");
Object.defineProperty(exports, "DiscountFilterItemDto", { enumerable: true, get: function () { return discount_filter_item_dto_1.DiscountFilterItemDto; } });
var autoComplete_option_item_dto_1 = require("./dto/autoComplete.option.item.dto");
Object.defineProperty(exports, "AutoCompleteOptionItemDto", { enumerable: true, get: function () { return autoComplete_option_item_dto_1.AutoCompleteOptionItemDto; } });
var discount_update_dto_1 = require("./dto/discount.update.dto");
Object.defineProperty(exports, "DiscountUpdateDto", { enumerable: true, get: function () { return discount_update_dto_1.DiscountUpdateDto; } });
var bulkAdjustmentCountType_1 = require("./enum/bulkAdjustmentCountType");
Object.defineProperty(exports, "BulkAdjustmentCountType", { enumerable: true, get: function () { return bulkAdjustmentCountType_1.BulkAdjustmentCountType; } });
var bulkDiscountType_1 = require("./enum/bulkDiscountType");
Object.defineProperty(exports, "BulkDiscountType", { enumerable: true, get: function () { return bulkDiscountType_1.BulkDiscountType; } });
var BXGXDiscountType_1 = require("./enum/BXGXDiscountType");
Object.defineProperty(exports, "BXGXDiscountType", { enumerable: true, get: function () { return BXGXDiscountType_1.BXGXDiscountType; } });
var BXGYCountType_1 = require("./enum/BXGYCountType");
Object.defineProperty(exports, "BXGYCountType", { enumerable: true, get: function () { return BXGYCountType_1.BXGYCountType; } });
var BXGYDiscountType_1 = require("./enum/BXGYDiscountType");
Object.defineProperty(exports, "BXGYDiscountType", { enumerable: true, get: function () { return BXGYDiscountType_1.BXGYDiscountType; } });
var BXGYGetType_1 = require("./enum/BXGYGetType");
Object.defineProperty(exports, "BXGYGetType", { enumerable: true, get: function () { return BXGYGetType_1.BXGYGetType; } });
var BXGYType_1 = require("./enum/BXGYType");
Object.defineProperty(exports, "BXGYType", { enumerable: true, get: function () { return BXGYType_1.BXGYType; } });
var cartAdjustmentDiscountType_1 = require("./enum/cartAdjustmentDiscountType");
Object.defineProperty(exports, "CartAdjustmentDiscountType", { enumerable: true, get: function () { return cartAdjustmentDiscountType_1.CartAdjustmentDiscountType; } });
var conditionCountType_1 = require("./enum/conditionCountType");
Object.defineProperty(exports, "ConditionCountType", { enumerable: true, get: function () { return conditionCountType_1.ConditionCountType; } });
var conditionOperator_1 = require("./enum/conditionOperator");
Object.defineProperty(exports, "ConditionOperator", { enumerable: true, get: function () { return conditionOperator_1.ConditionOperator; } });
var discountConditionType_1 = require("./enum/discountConditionType");
Object.defineProperty(exports, "DiscountConditionType", { enumerable: true, get: function () { return discountConditionType_1.DiscountConditionType; } });
var discountType_1 = require("./enum/discountType");
Object.defineProperty(exports, "DiscountType", { enumerable: true, get: function () { return discountType_1.DiscountType; } });
var productAdjustmentDiscountType_1 = require("./enum/productAdjustmentDiscountType");
Object.defineProperty(exports, "ProductAdjustmentDiscountType", { enumerable: true, get: function () { return productAdjustmentDiscountType_1.ProductAdjustmentDiscountType; } });
var discountFilterType_1 = require("./enum/discountFilterType");
Object.defineProperty(exports, "DiscountFilterType", { enumerable: true, get: function () { return discountFilterType_1.DiscountFilterType; } });
var login_dto_1 = require("./dto/login.dto");
Object.defineProperty(exports, "LoginDTO", { enumerable: true, get: function () { return login_dto_1.LoginDTO; } });
var auth_response_dto_1 = require("./dto/auth.response.dto");
Object.defineProperty(exports, "AuthResponseDTO", { enumerable: true, get: function () { return auth_response_dto_1.AuthResponseDTO; } });
var baseDBFields_dto_1 = require("./dto/baseDBFields.dto");
Object.defineProperty(exports, "BaseDBFieldsDto", { enumerable: true, get: function () { return baseDBFields_dto_1.BaseDBFieldsDto; } });
var company_item_dto_1 = require("./dto/company.item.dto");
Object.defineProperty(exports, "CompanyItemDto", { enumerable: true, get: function () { return company_item_dto_1.CompanyItemDto; } });
var company_paginate_response_dto_1 = require("./dto/company.paginate.response.dto");
Object.defineProperty(exports, "CompanyPaginateResponseDto", { enumerable: true, get: function () { return company_paginate_response_dto_1.CompanyPaginateResponseDto; } });
var paginate_response_metadata_dto_1 = require("./dto/paginate.response.metadata.dto");
Object.defineProperty(exports, "PaginateResponseMetadataDto", { enumerable: true, get: function () { return paginate_response_metadata_dto_1.PaginateResponseMetadataDto; } });
var paginate_request_dto_1 = require("./dto/paginate.request.dto");
Object.defineProperty(exports, "PaginateRequestDto", { enumerable: true, get: function () { return paginate_request_dto_1.PaginateRequestDto; } });
var validateAndPaintToInstance_1 = require("./utils/validateAndPaintToInstance");
Object.defineProperty(exports, "validateAndPaintToInstance", { enumerable: true, get: function () { return validateAndPaintToInstance_1.validateAndPaintToInstance; } });
var dtoValidator_1 = require("./utils/dtoValidator");
Object.defineProperty(exports, "dtoValidator", { enumerable: true, get: function () { return dtoValidator_1.dtoValidator; } });
//# sourceMappingURL=index.js.map