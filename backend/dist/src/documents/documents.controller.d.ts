import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    uploadDocument(file: any, dto: UploadDocumentDto): Promise<import("./entities/document.entity").Document>;
    findByApplication(applicationId: string): Promise<import("./entities/document.entity").Document[]>;
    findMyDocuments(req: any): Promise<import("./entities/document.entity").Document[]>;
}
