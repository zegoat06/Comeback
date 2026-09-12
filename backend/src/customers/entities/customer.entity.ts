import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';
import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.customer, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ nullable: true })
  nationalId!: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth!: Date;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  occupation!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Application, (application) => application.customer)
  applications!: Application[];

  @OneToMany(() => BankAccount, (account) => account.customer)
  bankAccounts!: BankAccount[];
}
