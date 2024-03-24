import { IsNumber } from 'class-validator';

export class JWTPayload {
  @IsNumber()
  userId: number;
}
