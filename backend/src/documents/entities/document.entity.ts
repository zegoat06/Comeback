import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Application } from '../../applications/entities/application.entity';
import { DocumentType } from './document-type.enum';

@Entity('documents')
export class Document {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => Application,
    application => application.documents,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'application_id',
  })
  application!: Application;

  @Column({
    type: 'enum',
    enum: DocumentType,
  })
  documentType!: DocumentType;

  @Column()
  fileName!: string;

  @Column()
  filePath!: string;

  @Column()
  mimeType!: string;

  @Column()
  fileSize!: number;

  @CreateDateColumn()
  uploadedAt!: Date;
}