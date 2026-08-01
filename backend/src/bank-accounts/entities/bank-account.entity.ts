import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity';
import { AccountType } from '../../applications/entities/account-type.enum';
import { AccountStatus } from './account-status.enum';
import { Application } from '../../applications/entities/application.entity';

@Entity('bank_accounts')
export class BankAccount {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => Customer,
    customer => customer.bankAccounts,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'customer_id',
  })
  customer!: Customer;

  @Column({
    unique: true,
    length: 20,
  })
  accountNumber!: string;    

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType!: AccountType;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  status!: AccountStatus;

  @ManyToOne(
    () => Application,
    {
      eager: true,
    },
  )
  @JoinColumn({
    name: 'application_id',
  })
  application!: Application;

  @CreateDateColumn()
  createdAt!: Date;
}
