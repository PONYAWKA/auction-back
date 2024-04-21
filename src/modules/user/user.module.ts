import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { JwtModule } from '../jwt/jwt.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
