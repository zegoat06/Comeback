import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Customer } from '../customers/entities/customer.entity';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { UpdateBankAccountStatusDto } from './dtos/update-bank-account-status.dto';
export declare class BankAccountsService {
    private readonly bankAccountRepository;
    private readonly customerRepository;
    constructor(bankAccountRepository: Repository<BankAccount>, customerRepository: Repository<Customer>);
    private generateAccountNumber;
    create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount>;
    findAll(): Promise<BankAccount[]>;
    findOne(id: string): Promise<BankAccount>;
    findCustomerAccounts(customerId: string): Promise<BankAccount[]>;
    findMyAccounts(userId: string): Promise<BankAccount[]>;
    updateStatus(id: string, dto: UpdateBankAccountStatusDto): Promise<BankAccount>;
    closeAccount(id: string): Promise<{
        message: string;
    }>;
    exists(accountNumber: string): Promise<boolean>;
}
