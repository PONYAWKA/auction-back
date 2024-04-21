import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAll() {
    return await this.prisma.users.findMany();
  }

  async getByEmail(email: string) {
    return await this.prisma.users.findFirst({ where: { email } });
  }

  async create(createUserDTO: CreateUserDTO) {
    console.log(createUserDTO.email);
    const user = await this.getByEmail(createUserDTO.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return await this.prisma.users.create({
      data: createUserDTO,
    });
  }
}
