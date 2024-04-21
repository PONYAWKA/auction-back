import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

import { JwtService } from './jwt.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_DURATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
