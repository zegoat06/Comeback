import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { databaseConfig } from './config/database.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { AccountTypeModule } from './account_type/account_type.module';
import { ApplicationsModule } from './applications/applications.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { DocumentsModule } from './documents/documents.module';
import { SupabaseModule } from './supabase/supabase.module';
import { PayChanguModule } from './paychangu/paychangu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    AccountTypeModule,
    ApplicationsModule,
    BankAccountsModule,
    DocumentsModule,
    SupabaseModule,
    PayChanguModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
