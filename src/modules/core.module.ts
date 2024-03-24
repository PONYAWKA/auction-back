import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
