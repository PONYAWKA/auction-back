import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { setCookie } from './utils/set-cookie';
import { CookieEnum } from 'src/common/constants/cookie-enum';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDTo: RegisterUserDTO,
    @Res() res: Response,
  ) {
    const { refreshToken, accessToken } =
      await this.authService.register(createUserDTo);
    setCookie(res, CookieEnum.Auth, refreshToken);
    return res.json(accessToken);
  }
}
