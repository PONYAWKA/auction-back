import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CookieEnum } from '@/common/constants/cookie-enum';

export const GetRefreshToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = request?.cookies[CookieEnum.Auth];

    if (!token) {
      return null;
    }

    return token;
  },
);
