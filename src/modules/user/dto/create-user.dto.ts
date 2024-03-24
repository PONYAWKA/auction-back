import { $Enums } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsDateString()
  birth: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  location: string;

  @IsString()
  passwordHash: string;

  @IsEnum($Enums.Sex)
  sex: $Enums.Sex;

  constructor() {}
}
