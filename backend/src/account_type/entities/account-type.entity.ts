import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Application } from '../../applications/entities/application.entity';
import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';

@Entity('account_types')
export class AccountType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    nullable: true,
  })
  description!: string;

  @Column({
    default: true,
  })
  active!: boolean;

  @OneToMany(
    () => Application,
    application => application.accountType,
  )
  applications!: Application[];

  @OneToMany(
    () => BankAccount,
    account => account.accountType,
  )
  bankAccounts!: BankAccount[];
}