import { IsDate, IsNumber, IsOptional } from 'class-validator';
export class GetViagemDto {
  origem: {
    nome: string;
    uf: string;
  };
  destino: {
    nome: string;
    uf: string;
  };
  @IsDate()
  dataInicial: Date;
  @IsDate()
  dataFinal: Date;
  @IsNumber()
  valor: number;
  @IsDate()
  createdAt: Date;
  veiculo: {
    capacidade: number;
    modelo: string;
    foto: string;
  };
  @IsOptional()
  comentario: {
    id: number;
    content: string;
    author: string;
    createdAt: Date;
  };
}
