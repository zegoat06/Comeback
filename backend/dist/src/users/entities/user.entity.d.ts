import { UserRole } from '../enums/user-role.enum';
import { Customer } from '../../customers/entities/customer.entity';
export declare class User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    customer: Customer;
}
