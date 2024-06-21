import { IsOptional, IsDateString } from 'class-validator';

export class ViagemFilterDto {
  @IsOptional()
  origemId?: number;

  @IsOptional()
  destinoId?: number;

  @IsOptional()
  @IsDateString()
  dataInicial?: string;

  @IsOptional()
  @IsDateString()
  dataFinal?: string;
}
