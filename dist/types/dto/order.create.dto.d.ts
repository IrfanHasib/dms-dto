import { OrderBaseDto } from './order.base.dto';
import { OrderProductUpdateDto } from './orderProduct.update.dto';
export declare class OrderCreateDto extends OrderBaseDto {
    orderProducts?: OrderProductUpdateDto[];
}
