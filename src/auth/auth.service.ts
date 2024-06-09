/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSec: number;

  constructor(
    private usersService: UsersService,
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

    const foundUser = await this.usersService.findByCpf(cpf);

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, name: foundUser.name };

    const token = this.jwtService.sign(payload);

    const id = foundUser.id;

    return { token, expiresIn: this.jwtExpirationTimeInSec, id };
  }
}
