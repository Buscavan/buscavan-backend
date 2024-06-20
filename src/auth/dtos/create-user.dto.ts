import { Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O email está fora do padrão' })
  email: string;
  @IsString()
  name: string;
  @Matches(process.env.REGEX_CPF)
  cpf: string;
  @MinLength(5, {
    message: 'A senha é muito curta',
  })
  @MaxLength(20, {
    message: 'A senha é muito longa',
  })
  password: string;
  fotoCnhUrl: string;
  fotoPerfilUrl: string;
  role: Role;
  phone?: number;
}
