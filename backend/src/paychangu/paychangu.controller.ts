import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { PayChanguService } from './paychangu.service';
import { InitiatePaymentDto } from './dtos';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('paychangu')
export class PayChanguController {
  constructor(private readonly payChanguService: PayChanguService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  initiatePayment(
    @Request() req,
    @Body() dto: InitiatePaymentDto,
  ) {
    return this.payChanguService.initiatePayment(dto);
  }

  @Get('verify/:reference')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  verifyPayment(@Param('reference') reference: string) {
    return this.payChanguService.verifyPayment(reference);
  }

  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-paychangu-signature') signature: string,
  ) {
    return this.payChanguService.handleWebhook(payload, signature);
  }

  @Get('application/:applicationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  getPaymentByApplication(@Param('applicationId') applicationId: string) {
    return this.payChanguService.getPaymentByApplication(applicationId);
  }

  @Get('reference/:reference')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  getPaymentByReference(@Param('reference') reference: string) {
    return this.payChanguService.getPaymentByReference(reference);
  }
}
