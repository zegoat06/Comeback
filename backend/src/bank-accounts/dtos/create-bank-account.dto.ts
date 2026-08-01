import { IsEnum, IsUUID } from 'class-validator';
import { AccountType } from '../../applications/entities/account-type.enum';

export class CreateBankAccountDto {

  @IsUUID()
  customerId!: string;

  @IsEnum(AccountType)
  accountType!: AccountType;

}