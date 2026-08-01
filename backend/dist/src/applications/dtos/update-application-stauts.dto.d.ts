import { ApplicationStatus } from '../entities/application-status.enum';
export declare class UpdateApplicationStatusDto {
    status: ApplicationStatus;
    rejectionReason?: string;
}
