import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { DeliverySummaryProductUpdateDto } from './deliverySummaryProduct.update.dto';
export declare class DeliverySummaryUpdateDto extends DeliverySummaryBaseDto {
    deliveryByUserId: number;
    deliverySummaryProducts?: DeliverySummaryProductUpdateDto[];
    deliverySummaryOrderIds?: number[];
    isDispatched: boolean;
    isReturned: boolean;
    isCompleted: boolean;
}
