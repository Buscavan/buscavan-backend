/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() login: LoginUserDto): Promise<AuthResponseDto> {
    return this.authService.signIn(login);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async createUser(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.createUser(dto);
  }
}
