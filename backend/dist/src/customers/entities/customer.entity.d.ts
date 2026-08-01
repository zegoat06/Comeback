import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';
import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';
export declare class Customer {
    id: string;
    user: User;
    nationalId: string;
    dateOfBirth: Date;
    address: string;
    occupation: string;
    createdAt: Date;
    applications: Application[];
    bankAccounts: BankAccount[];
}
