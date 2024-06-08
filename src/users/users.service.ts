import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto) {
    const user = await prisma.user.create({ data: dto });
    return user;
  }

  async loginUser(cpf: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        cpf,
        password,
      },
    });
    const idUser = user.id;
    return idUser;
  }
  async updateUser(id: string, data: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id:  id},
      data: data,
    });
    return user;
  }

  async findByCpf(cpf: string) {
    const user = await prisma.user.findFirst({
      where: {
        cpf: cpf
      },
    });
    return user;
  }
}
