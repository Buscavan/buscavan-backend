import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCommentDto } from './create-comment.dto';

class LocalDto {
  @IsNumber()
  id: number;
}
export enum TipoViagem {
  IDA,
  IDAVOLTA,
}

export class ViagemDto {
  @ValidateNested()
  @Type(() => LocalDto)
  origem: LocalDto;
  @ValidateNested()
  @Type(() => LocalDto)
  destino: LocalDto;
  @IsDate()
  dataInicial: Date;
  @IsDate()
  dataFinal: Date;
  @IsString()
  localEmbarqueIda: string;
  @IsString()
  localEmbarqueVolta: string;
  @IsNumber()
  valor: number;
  @IsDate()
  createdAt: Date;
  @IsString()
  @IsOptional()
  fotoDestinoUrl?: string;
  @IsNumber()
  veiculoId: number;
  @ValidateNested({ each: true })
  @Type(() => CreateCommentDto)
  @IsOptional()
  comentarios?: CreateCommentDto[];
  @IsEnum(TipoViagem)
  tipo: TipoViagem;
  @IsOptional()
  @IsString()
  descricao?: string;
}
