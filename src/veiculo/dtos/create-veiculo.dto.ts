import { IsNumber, IsString } from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  placa: string;
  @IsNumber()
  capacidade: number;
  @IsNumber()
  motoristaid: number;
}
