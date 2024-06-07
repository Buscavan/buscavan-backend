/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

   private jwtExpirationTimeInSec: number

   constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private configService: ConfigService
   ) {
      this.jwtExpirationTimeInSec = +this.configService.get<number>('JWT_EXPIRATION_TIME')
   }

   async signIn(name: string, password: string): Promise<AuthResponseDto> {
      const foundUser = await this.usersService.findByName(name);

      if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
         throw new UnauthorizedException();
      }

      const payload = { sub: foundUser.id, name: foundUser.name };

      const token = this.jwtService.sign(payload);

      return { token, expiresIn: this.jwtExpirationTimeInSec }
   }

}
