import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { Document } from './entities/document.entity';
import { UploadDocumentDto } from './dtos/upload-document.dto';
import { Customer } from '../customers/entities/customer.entity';
export declare class DocumentsService {
    private readonly documentRepository;
    private readonly applicationRepository;
    private readonly customerRepository;
    private readonly supabase;
    constructor(documentRepository: Repository<Document>, applicationRepository: Repository<Application>, customerRepository: Repository<Customer>, supabase: any);
    upload(dto: UploadDocumentDto, file: any): Promise<Document>;
    findByApplication(applicationId: string): Promise<Document[]>;
    findByCustomer(userId: string): Promise<Document[]>;
}
