import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TipoViagem {
  IDA,
  IDAVOLTA,
}

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
  dataIda: Date;
  @IsDate()
  dataVolta: Date;
  @IsString()
  localEmbarqueIda: string;
  @IsString()
  localEmbarqueVolta: string;
  @IsNumber()
  valor: number;
  @IsDate()
  createdAt: Date;
  veiculo: {
    modelo: string;
    placa: string;
    capacidade: number;
  };
  @IsOptional()
  comentario: {
    id: number;
    content: string;
    author: string;
    createdAt: Date;
  };
  @IsEnum(TipoViagem)
  tipo: TipoViagem;
  @IsOptional()
  @IsString()
  descricao: string;
}
