import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class RegisterUserDTO {
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
  @IsNotEmpty()
  password: string;

  @IsEnum($Enums.Sex)
  sex: $Enums.Sex;
}
