import { IsNumber, IsString } from 'class-validator';

export class PutVeiculoDto {
  @IsString()
  placa?: string;
  @IsNumber()
  capacidade?: number;
  @IsNumber()
  motoristaid?: number;
}
