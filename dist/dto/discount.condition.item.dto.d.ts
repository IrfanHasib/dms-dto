import "reflect-metadata";
import { ConditionCountType } from './../enum/conditionCountType';
import { ConditionOperator } from './../enum/conditionOperator';
import { DiscountConditionType } from './../enum/discountConditionType';
export declare class DiscountConditionItemDto {
    id: number;
    conditionValue: number;
    conditionOperator: ConditionOperator;
    conditionType: DiscountConditionType;
    conditionCountType: ConditionCountType;
}
