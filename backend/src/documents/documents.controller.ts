import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/enums/user-role.enum';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {

  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  @Post('upload')
  @Roles(UserRole.CUSTOMER)
  @UseInterceptors(
    FileInterceptor('file'),
  )
  uploadDocument(
    @UploadedFile() file: any,
    @Body() dto: UploadDocumentDto,
  ) {
    return this.documentsService.upload(
      dto,
      file,
    );
  }

  @Get('application/:applicationId')
  @Roles(
    UserRole.CUSTOMER,
    UserRole.BANK_OFFICER,
  )
  findByApplication(
    @Param('applicationId')
    applicationId: string,
  ) {
    return this.documentsService.findByApplication(
      applicationId,
    );
  }

  @Get('customer/me')
  @Roles(UserRole.CUSTOMER)
  findMyDocuments(@Request() req) {
    return this.documentsService.findByCustomer(req.user.id);
  }
}
