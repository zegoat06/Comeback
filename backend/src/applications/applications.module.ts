import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

import { Application } from './entities/application.entity';
import { Customer } from '../customers/entities/customer.entity';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Customer,
    ]),
    forwardRef(() => BankAccountsModule),
  ],
  controllers: [
    ApplicationsController,
  ],
  providers: [
    ApplicationsService,
  ],
  exports: [
    ApplicationsService,
  ],
})
export class ApplicationsModule {}
