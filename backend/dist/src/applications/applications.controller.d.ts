import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
import { ResubmitApplicationDto } from './dtos/resubmit-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(req: any, dto: CreateApplicationDto): Promise<import("./entities/application.entity").Application>;
    findMyApplications(req: any): Promise<import("./entities/application.entity").Application[]>;
    findAll(): Promise<import("./entities/application.entity").Application[]>;
    findOne(id: string): Promise<import("./entities/application.entity").Application>;
    approve(id: string): Promise<import("./entities/application.entity").Application>;
    requestResubmission(id: string, dto: ResubmitApplicationDto): Promise<import("./entities/application.entity").Application>;
    reject(id: string, dto: UpdateApplicationStatusDto): Promise<import("./entities/application.entity").Application>;
}
