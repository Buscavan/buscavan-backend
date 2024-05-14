import { Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @Matches(
    '[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}',
  )
  cpf: string;

  @MinLength(5, {
    message: 'Password is too short',
  })
  @MaxLength(20, {
    message: 'Password is too long',
  })
  password: string;
}
