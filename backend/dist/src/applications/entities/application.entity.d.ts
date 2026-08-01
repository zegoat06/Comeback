import { Customer } from '../../customers/entities/customer.entity';
import { Document } from '../../documents/entities/document.entity';
import { AccountType } from './account-type.enum';
import { ApplicationStatus } from './application-status.enum';
export declare class Application {
    id: string;
    customer: Customer;
    accountType: AccountType;
    status: ApplicationStatus;
    remarks: string;
    rejectionReason: string | null;
    submittedAt: Date;
    documents: Document[];
}
