import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { UpdateBankAccountStatusDto } from './dtos/update-bank-account-status.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('bank-accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  /**
   * Admin - Get all bank accounts
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  findAll() {
    return this.bankAccountsService.findAll();
  }

  /**
   * Customer - Get my bank accounts
   */
  @Get('my')
  @Roles(UserRole.CUSTOMER)
  findMyAccounts(@Request() req) {
    return this.bankAccountsService.findMyAccounts(req.user.id);
  }

  /**
   * Admin - Get one bank account
   */
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }

  /**
   * Admin - Create bank account (manual)
   */
  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateBankAccountDto) {
    return this.bankAccountsService.create(dto);
  }

  /**
   * Admin - Update account status
   */
  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBankAccountStatusDto,
  ) {
    return this.bankAccountsService.updateStatus(id, dto);
  }

  /**
   * Admin - Close account
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  closeAccount(@Param('id') id: string) {
    return this.bankAccountsService.closeAccount(id);
  }
}
