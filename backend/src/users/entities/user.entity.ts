import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => Customer, (customer) => customer.user, {
    cascade: true,
    eager: false,
  })
  customer!: Customer;
}
