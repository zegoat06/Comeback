import { IsEnum } from 'class-validator';
import { AccountType } from '../entities/account-type.enum';

export class CreateApplicationDto {
  @IsEnum(AccountType, {
    message: 'Please select a valid account type.',
  })
  accountType!: AccountType;
}
