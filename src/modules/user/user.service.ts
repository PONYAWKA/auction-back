import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async create(createUserDTO: CreateUserDTO) {
    return await this.prisma.user.create({
      data: createUserDTO,
    });
  }
}
