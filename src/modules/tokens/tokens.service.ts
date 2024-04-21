import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class TokensService {
  constructor(private readonly prisma: DatabaseService) {}
  public async createRefreshTokenForUser(userId: number, refreshToken: string) {
    const token = await this.prisma.tokens.create({
      data: { refreshToken, userId },
    });
    return token;
  }
  public async updateRefreshTokenForUser(
    userId: number,
    newRefreshToken: string,
    oldRefreshToken?: string,
  ) {
    const isTokenExist =
      oldRefreshToken &&
      !!(await this.prisma.tokens.findFirst({
        where: { refreshToken: oldRefreshToken },
      }));

    if (isTokenExist) {
      return await this.prisma.tokens.updateMany({
        where: {
          userId,
          refreshToken: oldRefreshToken,
        },
        data: {
          refreshToken: newRefreshToken,
        },
      });
    } else {
      return await this.createRefreshTokenForUser(userId, newRefreshToken);
    }
  }

  public async removeToken(userId: number, refreshToken: string) {
    await this.prisma.tokens.deleteMany({ where: { refreshToken, userId } });
  }
}
