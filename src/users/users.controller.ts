import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/create')
  createUsers(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('/login')
  loginUser(@Body() loginDto: LoginUserDto) {
    const { cpf, password } = loginDto;
    return this.usersService.loginUser(cpf, password);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Get('/all')
  getUsers() {
    return this.usersService.getUsers();
  }
}
