import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { RefreshJwtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule, JwtModule],
  providers: [AuthService, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
