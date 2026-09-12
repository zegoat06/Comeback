import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Application } from '../applications/entities/application.entity';
import { Document } from '../documents/entities/document.entity';
import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { AccountType } from '../account_type/entities/account-type.entity';
import { Payment } from '../paychangu/entities/payment.entity';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
  username: configService.get<string>('DB_USERNAME') || 'postgres',
  password: configService.get<string>('DB_PASSWORD') || '',
  database: configService.get<string>('DB_DATABASE') || 'postgres',
  entities: [
    User,
    Customer,
    Application,
    Document,
    BankAccount,
    AccountType,
    Payment,
  ],
  synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
