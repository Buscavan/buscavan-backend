/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { PrismaClient } from '@prisma/client';

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

    //  if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
    if (!foundUser || password !== foundUser.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, name: foundUser.name };

    const token = this.jwtService.sign(payload);

    // const id = foundUser.id;
    const user = foundUser;

    return { token, expiresIn: this.jwtExpirationTimeInSec, user };
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existingCpf = await prisma.user.findUnique({
      where: { cpf: dto.cpf },
    });

    const existingEmail = await prisma.user.findUnique({
      where: { cpf: dto.cpf },
    });

    if (existingEmail) {
      throw new Error('Email já cadastrado');
    }

    if (existingCpf) {
      throw new Error('CPF já cadastrado');
    }

    const user = await prisma.user.create({ data: dto });

    const payload = { sub: user.id, name: user.name };

    const token = this.jwtService.sign(payload);

    const expiresin = this.jwtExpirationTimeInSec;

    const dtoUser = { token, expiresin, ...user };

    return dtoUser;
  }
}
