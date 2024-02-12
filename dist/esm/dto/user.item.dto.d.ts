import { UserBaseDto } from './user.base.dto';
import { BaseDBFieldsDto } from './baseDBFields.dto';
declare const UserItemDto_base: import("ts-mixer/dist/types/types").Class<any[], BaseDBFieldsDto & UserBaseDto, typeof BaseDBFieldsDto & typeof UserBaseDto>;
export declare class UserItemDto extends UserItemDto_base {
    organizationId: number;
}
export {};
