import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @Matches(process.env.REGEX_CPF)
  cpf: string;

  @ApiProperty()
  @IsString()
  password: string;
}
