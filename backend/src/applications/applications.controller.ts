import {
  Body,
  Controller,
  Get,
  Param,
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
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Roles(UserRole.CUSTOMER)
  create(@Request() req, @Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(req.user.id, dto);
  }

  @Get('my')
  @Roles(UserRole.CUSTOMER)
  findMyApplications(@Request() req) {
    return this.applicationsService.findMyApplications(req.user.id);
  }

  @Get()
  @Roles(UserRole.BANK_OFFICER)
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.BANK_OFFICER)
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Post(':id/approve')
  @Roles(UserRole.BANK_OFFICER)
  approve(@Param('id') id: string) {
    return this.applicationsService.approve(id);
  }

  @Post(':id/resubmission')
  @Roles(UserRole.BANK_OFFICER)
  requestResubmission(@Param('id') id: string, @Body() dto: ResubmitApplicationDto) {
    return this.applicationsService.requestResubmission(id, dto);
  }

  @Post(':id/reject')
  @Roles(UserRole.BANK_OFFICER)
  reject(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.applicationsService.reject(id, dto);
  }
}
