import { UserBaseDto } from './user.base.dto';
export declare class UserCreateDto extends UserBaseDto {
    organizationId: number;
    password: string;
}
