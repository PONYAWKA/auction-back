import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CookieEnum } from 'src/common/constants/cookie-enum';

import { GetPayload } from '@/common/decorators';
import { JWTPayload } from '@/types/jwt-payload';

import { AuthService } from './auth.service';
import { GetRefreshToken } from './decorators';
import { LoginUserDTO } from './dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { RefreshAuthGuard } from './guards';
import { setCookie } from './utils/set-cookie';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDTO: RegisterUserDTO,
    @Res() res: Response,
  ) {
    const { refreshToken, accessToken } =
      await this.authService.register(createUserDTO);

    setCookie(res, CookieEnum.Auth, refreshToken);

    return res.json({ accessToken });
  }

  @Post('/login')
  public async login(
    @Body() loginUserDTO: LoginUserDTO,
    @GetRefreshToken() oldRefreshToken: string,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginUserDTO,
      oldRefreshToken,
    );

    setCookie(res, CookieEnum.Auth, refreshToken);

    return res.json({ accessToken });
  }

  @Delete('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(
    @GetPayload() { userId }: JWTPayload,
    @GetRefreshToken() oldRefreshToken: string,
    @Res() res: Response,
  ) {
    await this.authService.logout(userId, oldRefreshToken);
    setCookie(res, CookieEnum.Auth, null);
  }

  @Get('/refresh')
  @UseGuards(RefreshAuthGuard)
  public async refresh(
    @GetPayload() { userId }: JWTPayload,
    @GetRefreshToken() oldRefreshToken: string,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      userId,
      oldRefreshToken,
    );

    setCookie(res, CookieEnum.Auth, refreshToken);

    return res.json({ accessToken });
  }
}
