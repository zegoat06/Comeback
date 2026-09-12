import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  nationalId?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  occupation?: string;
}
