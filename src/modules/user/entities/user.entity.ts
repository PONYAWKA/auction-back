import { $Enums, User } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export class UserEntity implements User {
  @IsDate()
  birth: Date;

  @IsString()
  passwordHash: string;

  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  location: string;

  @IsString()
  password: string;

  @IsEnum($Enums.Sex)
  sex: $Enums.Sex;
}
