import { Application } from '../../applications/entities/application.entity';
import { DocumentType } from './document-type.enum';
export declare class Document {
    id: string;
    application: Application;
    documentType: DocumentType;
    fileName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    uploadedAt: Date;
}
