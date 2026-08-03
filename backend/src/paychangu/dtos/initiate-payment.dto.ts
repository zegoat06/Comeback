import { IsUUID, IsNumber, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class InitiatePaymentDto {
  @IsUUID()
  applicationId!: string;

  @IsNumber()
  @Min(100)
  amount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  returnUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  callbackUrl?: string;
}
