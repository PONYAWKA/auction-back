import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { JWTPayload } from './dto/jwt-payload.dto';

@Injectable()
export class JwtService {
  private jwtAccessSecret: string;
  private jwtAccessDuration: number;
  private jwtRefreshSecret: string;
  private jwtRefreshDuration: number;

  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly config: ConfigService,
    private readonly prisma: DatabaseService,
  ) {
    this.jwtAccessDuration = config.get('JWT_ACCESS_DURATION');
    this.jwtAccessSecret = config.get('JWT_ACCESS_SECRET');

    this.jwtRefreshDuration = config.get('JWT_REFRESH__DURATION');
    this.jwtRefreshSecret = config.get('JWT_REFRESH_SECRET');
  }

  async createJWTAccess(payload: JWTPayload) {
    const accessToken = await this.nestJwtService.signAsync(payload, {
      secret: this.jwtAccessSecret,
      expiresIn: this.jwtAccessDuration,
    });
    console.log('df');
    return accessToken;
  }
  async createJWTRefresh(payload: JWTPayload) {
    return await this.nestJwtService.signAsync(payload, {
      secret: this.jwtAccessSecret,
      expiresIn: this.jwtAccessDuration,
    });
  }

  async createJWTAccessRefresh(payload: JWTPayload) {
    const data = {
      accessToken: await this.createJWTAccess(payload),
      refreshToken: await this.createJWTRefresh(payload),
    };

    return data;
  }

  async saveRefreshUserToJWT(userId: number, token: string) {
    return await this.prisma.token.upsert({
      where: { userId },
      update: {
        refreshToken: token,
      },
      create: {
        userId,
        refreshToken: token,
      },
    });
  }
}
