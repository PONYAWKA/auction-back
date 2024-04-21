import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/common/guards';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserBody: CreateUserDTO) {
    return await this.userService.create(createUserBody);
  }

  @Get('all')
  async all() {
    return this.userService.getAll();
  }
}
