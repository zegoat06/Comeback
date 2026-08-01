import { Application } from '../../applications/entities/application.entity';
import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';
export declare class AccountType {
    id: string;
    name: string;
    description: string;
    active: boolean;
    applications: Application[];
    bankAccounts: BankAccount[];
}
