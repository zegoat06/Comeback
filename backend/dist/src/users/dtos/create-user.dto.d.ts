import { UserRole } from '../enums/user-role.enum';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: UserRole;
}
