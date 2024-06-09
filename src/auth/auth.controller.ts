/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() login: LoginUserDto): Promise<AuthResponseDto> {
    return this.authService.signIn(login);
  }
}
