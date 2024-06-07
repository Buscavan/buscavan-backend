/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService){}

   @Post('login')
   async signIn(
      @Body('name') name: string,
      @Body('password') password: string
   ) : Promise<AuthResponseDto> {
      return this.authService.signIn(name, password)
   }
}
