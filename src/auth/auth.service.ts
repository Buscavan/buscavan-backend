/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { AlterUserDto } from './dtos/alter-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSec: number;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSec = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(login: LoginUserDto): Promise<AuthResponseDto> {
    const cpf = login.cpf;
    const password = login.password;

    const foundUser = await prisma.user.findUnique({
      where: { cpf: cpf },
    });

    if (!foundUser || password !== foundUser.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: foundUser.cpf,
      name: foundUser.name,
      role: foundUser.role,
    };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSec, user: foundUser };
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existingCpf = await prisma.user.findUnique({
      where: { cpf: dto.cpf },
    });

    const existingEmail = await prisma.user.findUnique({
      where: { cpf: dto.cpf },
    });

    if (existingEmail) {
      throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
    }

    if (existingCpf) {
      throw new HttpException('CPF já cadastrado', HttpStatus.CONFLICT);
    }

    const user = await prisma.user.create({ data: dto });

    const payload = { sub: user.cpf, name: user.name, role: user.role };

    const token = this.jwtService.sign(payload);

    const expiresin = this.jwtExpirationTimeInSec;

    const dtoUser = { token, expiresin, ...user };

    return dtoUser;
  }
  async alterUser(dto: AlterUserDto, cpf: string) {
    try {
      const user = await prisma.user.update({
        where: { cpf: cpf },
        data: dto,
      });
      return user;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
