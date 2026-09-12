import { IsEnum } from 'class-validator';
import { AccountStatus } from '../entities/account-status.enum';

export class UpdateBankAccountStatusDto {
  @IsEnum(AccountStatus)
  status!: AccountStatus;
}
