import { IsEnum, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';
import { ApplicationStatus } from '../entities/application-status.enum';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus, {
    message: 'Invalid application status.',
  })
  status!: ApplicationStatus;

  @ValidateIf((object) => object.status === ApplicationStatus.REJECTED)
  @IsString()
  @MaxLength(500)
  rejectionReason?: string;
}
