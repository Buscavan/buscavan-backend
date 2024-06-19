import { IsNumber, IsString } from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  placa: string;
  @IsNumber()
  capacidade: number;
  @IsNumber()
  motoristaId: number;
  @IsString()
  modelo: string;
}
