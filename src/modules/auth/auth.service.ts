import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '../jwt/jwt.service';
import { TokensService } from '../tokens/tokens.service';
import { UserService } from '../user/user.service';
import { LoginUserDTO } from './dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { comparePasswordWithHash } from './utils';
import { createHash } from './utils/create-hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokensService,
  ) {}
  async register({ password, birth, ...user }: RegisterUserDTO) {
    const passwordHash = createHash(password);
    const updatedBirth = new Date(birth).toISOString();
    const { id } = await this.userService.create({
      passwordHash,
      birth: updatedBirth,
      ...user,
    });

    const jwts = await this.jwtService.createJWTAccessRefresh({ userId: id });

    await this.tokenService.createRefreshTokenForUser(id, jwts.refreshToken);

    return jwts;
  }
  async login({ email, password }: LoginUserDTO, oldRefreshToken?: string) {
    const { id, passwordHash } = await this.userService.getByEmail(email);
    const isPasswordValid = comparePasswordWithHash(password, passwordHash);

    if (!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const jwts = await this.jwtService.createJWTAccessRefresh({ userId: id });

    await this.tokenService.updateRefreshTokenForUser(
      id,
      jwts.refreshToken,
      oldRefreshToken,
    );

    return jwts;
  }

  async logout(userId: number, refreshToken: string) {
    await this.tokenService.removeToken(userId, refreshToken);
  }

  async refresh(userId: number, oldRefreshToken: string) {
    const jwts = await this.jwtService.createJWTAccessRefresh({ userId });

    await this.tokenService.updateRefreshTokenForUser(
      userId,
      jwts.refreshToken,
      oldRefreshToken,
    );

    return jwts;
  }
}
