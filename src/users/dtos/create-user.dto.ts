import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Matches(
    '[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}',
  )
  cpf: string;
  @ApiProperty()
  @MinLength(5, {
    message: 'Password is too short',
  })
  @MaxLength(20, {
    message: 'Password is too long',
  })
  password: string;
}
