import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { TokensModule } from './tokens/tokens.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule, TokensModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
