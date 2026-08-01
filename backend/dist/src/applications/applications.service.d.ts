import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { Customer } from '../customers/entities/customer.entity';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { ResubmitApplicationDto } from './dtos/resubmit-application.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
export declare class ApplicationsService {
    private readonly applicationRepository;
    private readonly customerRepository;
    constructor(applicationRepository: Repository<Application>, customerRepository: Repository<Customer>);
    create(userId: string, dto: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: string): Promise<Application>;
    findMyApplications(userId: string): Promise<Application[]>;
    approve(id: string): Promise<Application>;
    reject(id: string, dto: UpdateApplicationStatusDto): Promise<Application>;
    requestResubmission(id: string, dto: ResubmitApplicationDto): Promise<Application>;
}
