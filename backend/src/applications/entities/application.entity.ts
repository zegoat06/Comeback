import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity';
import { Document } from '../../documents/entities/document.entity';

import { AccountType } from './account-type.enum';
import { ApplicationStatus } from './application-status.enum';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => Customer,
    (customer) => customer.applications,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType!: AccountType;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status!: ApplicationStatus;

  @Column({
    nullable: true,
    type: 'text',
  })
  remarks!: string;

  @Column({
    nullable: true,
    type: 'text',
    default: null,
  })
  rejectionReason!: string | null;

  @CreateDateColumn()
  submittedAt!: Date;

  @OneToMany(
    () => Document,
    (document) => document.application,
    {
      cascade: true,
    },
  )
  documents!: Document[];
}
