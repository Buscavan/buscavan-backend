import { IsNumber, IsString } from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  placa: string;
  @IsNumber()
  capacidade: number;
  @IsString()
  motoristaCPF: string;
  @IsString()
  modelo: string;
}
