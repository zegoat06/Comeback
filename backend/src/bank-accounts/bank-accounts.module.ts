import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

import { BankAccount } from './entities/bank-account.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankAccount,
      Customer,
    ]),
  ],
  controllers: [
    BankAccountsController,
  ],
  providers: [
    BankAccountsService,
  ],
  exports: [
    BankAccountsService,
  ],
})
export class BankAccountsModule {}