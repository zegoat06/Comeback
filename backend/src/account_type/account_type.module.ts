import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountType } from './entities/account-type.entity';
import { AccountTypesController } from './account_type.controller';
import { AccountTypesService } from './account_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountType])],
  controllers: [AccountTypesController],
  providers: [AccountTypesService],
  exports: [AccountTypesService],
})
export class AccountTypeModule {}
