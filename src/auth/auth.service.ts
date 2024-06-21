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
  private jwtRefreshExpirationTimeInSec: number;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSec = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
    this.jwtRefreshExpirationTimeInSec = +this.configService.get<number>(
      'JWT_REFRESH_EXPIRATION_TIME',
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
    const refreshToken = await this.generateRefreshToken(foundUser.cpf)

    return { token, expiresIn: this.jwtExpirationTimeInSec, refreshToken, user: foundUser };
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
    const refreshToken = await this.generateRefreshToken(user.cpf);

    const expiresin = this.jwtExpirationTimeInSec;

    const dtoUser = { token, expiresin, refreshToken, ...user };

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
  private async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { 
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: `${this.jwtRefreshExpirationTimeInSec}`,
      },
    );
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + this.jwtRefreshExpirationTimeInSec * 1000),
      },
    });
    return refreshToken;
  }
  async refreshTokens(refreshToken: string) {
    const tokenData = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if(!tokenData) {
      throw new UnauthorizedException('Refresh Token Inválido!')
    }
    if(tokenData.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh Token Expirado.')
    }
    const userId = tokenData.userId;
    await prisma.refreshToken.delete({ where: { token: refreshToken} });
    const newAccessToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.jwtExpirationTimeInSec}`,
      },
    );
    const newRefreshToken = await this.generateRefreshToken(userId);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
