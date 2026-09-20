import { IsEnum, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { AccountType } from '../entities/account-type.enum';

export class CreateApplicationDto {
  @IsEnum(AccountType, {
    message: 'Please select a valid account type.',
  })
  accountType!: AccountType;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  occupation!: string;

  @IsString()
  @IsOptional()
  incomeRange?: string;

  @IsString()
  @IsOptional()
  nextOfKin?: string;

  @IsString()
  @IsOptional()
  nextOfKinPhone?: string;

  @IsString()
  @IsNotEmpty()
  nationalId!: string;
}