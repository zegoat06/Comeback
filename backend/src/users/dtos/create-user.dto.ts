import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
