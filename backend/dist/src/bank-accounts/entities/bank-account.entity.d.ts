import { Customer } from '../../customers/entities/customer.entity';
import { AccountType } from '../../applications/entities/account-type.enum';
import { AccountStatus } from './account-status.enum';
import { Application } from '../../applications/entities/application.entity';
export declare class BankAccount {
    id: string;
    customer: Customer;
    accountNumber: string;
    accountType: AccountType;
    status: AccountStatus;
    application: Application;
    createdAt: Date;
}
