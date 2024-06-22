import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AlterUserDto {
  @IsEmail({}, { message: 'O email está fora do padrão' })
  email: string;
  @ApiProperty()
  @IsString()
  name: string;
  @Matches(process.env.REGEX_CPF)
  cpf: string;
  // @MinLength(5, {
  //   message: 'A senha é muito curta',
  // })
  // @MaxLength(20, {
  //   message: 'A senha é muito longa',
  // })
  // password: string;
  phone: string;
}
