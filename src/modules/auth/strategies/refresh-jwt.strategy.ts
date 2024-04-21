import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CookieEnum } from '@/common/constants/cookie-enum';
import { JWTPayload } from '@/types/jwt-payload';
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies[CookieEnum.Auth];
          if (!data) {
            return null;
          }

          return data;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    if (!payload) {
      throw new BadRequestException('Missing refresh jwt');
    }
    return payload;
  }
}
