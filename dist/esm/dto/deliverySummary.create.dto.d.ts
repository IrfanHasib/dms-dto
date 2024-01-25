import { DeliverySummaryBaseDto } from './deliverySummary.base.dto';
import { DeliverySummaryProductCreateDto } from './deliverySummaryProduct.create.dto';
export declare class DeliverySummaryCreateDto extends DeliverySummaryBaseDto {
    deliverySummaryProducts?: DeliverySummaryProductCreateDto[];
}
