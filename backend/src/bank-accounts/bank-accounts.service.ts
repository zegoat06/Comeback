import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankAccount } from './entities/bank-account.entity';
import { Customer } from '../customers/entities/customer.entity';

import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { UpdateBankAccountStatusDto } from './dtos/update-bank-account-status.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  private async generateAccountNumber(): Promise<string> {
    let accountNumber: string;
    let exists: BankAccount | null;

    do {
      accountNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
      exists = await this.bankAccountRepository.findOne({
        where: { accountNumber },
      });
    } while (exists);

    return accountNumber;
  }

  async create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> {
    const customer = await this.customerRepository.findOne({
      where: { id: createBankAccountDto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    const existingAccount = await this.bankAccountRepository.findOne({
      where: {
        customer: { id: customer.id },
        accountType: createBankAccountDto.accountType,
      },
    });

    if (existingAccount) {
      throw new ConflictException('Customer already has this account type.');
    }

    const accountNumber = await this.generateAccountNumber();

    const account = this.bankAccountRepository.create({
      customer,
      accountType: createBankAccountDto.accountType,
      accountNumber,
    });

    return await this.bankAccountRepository.save(account);
  }

  async findAll(): Promise<BankAccount[]> {
    return await this.bankAccountRepository.find({
      relations: { customer: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<BankAccount> {
    const account = await this.bankAccountRepository.findOne({
      where: { id },
      relations: { customer: true },
    });

    if (!account) {
      throw new NotFoundException('Bank account not found.');
    }

    return account;
  }

  async findCustomerAccounts(customerId: string): Promise<BankAccount[]> {
    return await this.bankAccountRepository.find({
      where: { customer: { id: customerId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findMyAccounts(userId: string): Promise<BankAccount[]> {
    const customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found.');
    }

    return this.findCustomerAccounts(customer.id);
  }

  async updateStatus(id: string, dto: UpdateBankAccountStatusDto): Promise<BankAccount> {
    const account = await this.findOne(id);
    account.status = dto.status;
    return await this.bankAccountRepository.save(account);
  }

  async closeAccount(id: string): Promise<{ message: string }> {
    const account = await this.findOne(id);
    account.status = 'Closed' as any;
    await this.bankAccountRepository.save(account);
    return { message: 'Bank account closed successfully.' };
  }

  async exists(accountNumber: string): Promise<boolean> {
    const account = await this.bankAccountRepository.findOne({
      where: { accountNumber },
    });
    return !!account;
  }
}
