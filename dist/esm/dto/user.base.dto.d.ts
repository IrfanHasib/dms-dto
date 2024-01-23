import { UserType } from '../enum/UserType';
import { DMSRole } from '../enum/DMSRole';
import { OrganizationRole } from '../enum/organizationRole';
export declare class UserBaseDto {
    name: string;
    mobile: string;
    email: string;
    address: string;
    userType: UserType;
    dmsRole: DMSRole;
    organizationRole: OrganizationRole;
}
