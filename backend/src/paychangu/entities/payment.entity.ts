import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Application } from '../../applications/entities/application.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Application, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application!: Application;

  @Column({ unique: true })
  reference!: string;

  @Column()
  paymentUrl!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ length: 3, default: 'MWK' })
  currency!: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ nullable: true })
  provider!: string;

  @Column({ nullable: true })
  paidAt!: Date;

  @Column({ nullable: true, type: 'text' })
  errorMessage!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt!: Date;
}
