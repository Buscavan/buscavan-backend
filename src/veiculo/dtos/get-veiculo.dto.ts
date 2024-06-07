import { IsNumber, IsString } from 'class-validator';

export class GetVeiculoDto {
  @IsString()
  placa: string;
  @IsNumber()
  capacidade: number;
  motorista: {
    name: string;
  };
}
