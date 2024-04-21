import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

import { JwtModule } from '../jwt/jwt.module';
import { TokensModule } from '../tokens/tokens.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshJwtStrategy } from './strategies';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule, JwtModule, TokensModule],
  providers: [AuthService, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
