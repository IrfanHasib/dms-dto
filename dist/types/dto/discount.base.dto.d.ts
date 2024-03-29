import { BulkAdjustmentCountType } from '../enum/bulkAdjustmentCountType';
import { CartAdjustmentDiscountType } from '../enum/cartAdjustmentDiscountType';
import { DiscountType } from '../enum/discountType';
import { ProductAdjustmentDiscountType } from '../enum/productAdjustmentDiscountType';
import { BXGYType } from '../enum/BXGYType';
import { BXGYCountType } from '../enum/BXGYCountType';
import { BXGYGetType } from '../enum/BXGYGetType';
import { DiscountBulkItemDto } from './discount.bulk.item.dto';
import { DiscountBxgyItemDto } from './discount.bxgy.item.dto';
import { DiscountBxgxItemDto } from './discount.bxgx.item.dto';
import { DiscountFilterItemDto } from './discount.filter.item.dto';
import { DiscountConditionItemDto } from './discount.condition.item.dto';
export declare class DiscountBaseDto {
    name: string;
    discountType: DiscountType;
    isEnabled: boolean;
    isIgnoreOther: boolean;
    isIgnoreThisIfOtherMatched: boolean;
    priority: number;
    usageLimit: number;
    productAdjustmentDiscountType: ProductAdjustmentDiscountType;
    productAdjustmentDiscountAmount: number;
    cartAdjustmentDiscountType: CartAdjustmentDiscountType;
    cartAdjustmentDiscountAmount: number;
    cartAdjustmentLabel: string;
    bulkAdjustmentCountType: BulkAdjustmentCountType;
    discountBulkItems: DiscountBulkItemDto[];
    isBXGXRecursive: boolean;
    discountBXGXItems: DiscountBxgxItemDto[];
    BXGYType: BXGYType;
    BXGYCountType: BXGYCountType;
    BXGYGetType: BXGYGetType;
    isBXGYRecursive: boolean;
    discountBXGYItems: DiscountBxgyItemDto[];
    activeFromDateTime: Date;
    activeToDateTime: Date;
    isMatchAllCondition: boolean;
    discountFilterItems: DiscountFilterItemDto[];
    discountConditionItems: DiscountConditionItemDto[];
}
