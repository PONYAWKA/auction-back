import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserBody: CreateUserDTO) {
    return await this.userService.create(createUserBody);
  }

  @Get()
  async get() {
    return this.userService.getAll();
  }
}
