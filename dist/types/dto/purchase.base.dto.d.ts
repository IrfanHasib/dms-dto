import { PurchaseItemBaseDto } from './purchase.item.base.dto';
export declare class PurchaseBaseDto {
    title: string;
    invoiceNumber: string;
    invoiceImage: string;
    comment: string;
    isDraft: boolean;
    companyId: number;
    purchaseItems: PurchaseItemBaseDto[];
}
