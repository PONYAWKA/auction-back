import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { createHash } from './utils/create-hash';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ password, birth, ...user }: RegisterUserDTO) {
    const passwordHash = createHash(password);
    const updatedBirth = new Date(birth).toISOString();
    const { id } = await this.userService.create({
      passwordHash,
      birth: updatedBirth,
      ...user,
    });
    const jwt = await this.jwtService.createJWTAccessRefresh({ userId: id });

    return jwt;
  }
}
