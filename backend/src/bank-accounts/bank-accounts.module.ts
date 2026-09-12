import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

import { BankAccount } from './entities/bank-account.entity';
import { Customer } from '../customers/entities/customer.entity';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankAccount,
      Customer,
    ]),
    forwardRef(() => ApplicationsModule),
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
