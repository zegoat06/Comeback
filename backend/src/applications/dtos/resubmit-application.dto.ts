import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResubmitApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  remarks!: string;
}
