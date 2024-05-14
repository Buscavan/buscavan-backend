import { IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @Matches(
    '[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}',
  )
  cpf: string;

  @IsString()
  password: string;
}
