import { IsOptional, IsInt, IsDateString } from 'class-validator';

export class ViagemFilterDto {
  @IsOptional()
  @IsInt()
  origemId?: number;

  @IsOptional()
  @IsInt()
  destinoId?: number;

  @IsOptional()
  @IsDateString()
  dataInicial?: string;

  @IsOptional()
  @IsDateString()
  dataFinal?: string;
}
