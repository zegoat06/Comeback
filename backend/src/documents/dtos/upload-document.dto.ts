import { IsEnum, IsUUID } from 'class-validator';
import { DocumentType } from '../entities/document-type.enum';

export class UploadDocumentDto {

  @IsUUID()
  applicationId!: string;

  @IsEnum(DocumentType)
  documentType!: DocumentType;

}