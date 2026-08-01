import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApplicationsService } from './applications.service';

import { CreateApplicationDto } from './dtos/create-application.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
import { ResubmitApplicationDto } from './dtos/resubmit-application.dto';  

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/enums/user-role.enum';

@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {

  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  /**
   * CUSTOMER
   * Submit new application
   */
  @Post()
  @Roles(UserRole.CUSTOMER)
  create(
    @Request() req,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(
      req.user.id,
      dto,
    );
  }

  /**
   * CUSTOMER
   * View own applications
   */
  @Get('my')
  @Roles(UserRole.CUSTOMER)
  findMyApplications(
    @Request() req,
  ) {
    return this.applicationsService.findMyApplications(
      req.user.id,
    );
  }

  /**
   * BANK OFFICER
   * View all applications
   */
  @Get()
  @Roles(UserRole.BANK_OFFICER)
  findAll() {
    return this.applicationsService.findAll();
  }

  /**
   * BANK OFFICER
   * View one application
   */
  @Get(':id')
  @Roles(UserRole.BANK_OFFICER)
  findOne(
    @Param('id') id: string,
  ) {
    return this.applicationsService.findOne(id);
  }

  /**
   * BANK OFFICER
   * Approve application
   */
  @Post(':id/approve')
  @Roles(UserRole.BANK_OFFICER)
  approve(
    @Param('id') id: string,
  ) {
    return this.applicationsService.approve(id);
  }

  /** 
   * BANK OFFICER
   * resubmit application
   */
  @Post(':id/resubmission')
@Roles(
    UserRole.BANK_OFFICER,
)
requestResubmission(
    @Param('id') id: string,
    @Body() dto: ResubmitApplicationDto,
) {
    return this.applicationsService.requestResubmission(
        id,
        dto,
    );
}

  /**
   * BANK OFFICER
   * Reject application
   */
  @Post(':id/reject')
  @Roles(UserRole.BANK_OFFICER)
  reject(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.reject(
      id,
      dto,
    );
  }

}