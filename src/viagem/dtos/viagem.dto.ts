import {
  IsDate,
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
export class ViagemDto {
  // @ValidateNested()
  // @Type(() => LocalDto)
  // origem: LocalDto;
  // @ValidateNested()
  // @Type(() => LocalDto)
  // destino: LocalDto;
  @IsNumber()
  origemId: number;
  @IsNumber()
  destinoId: number;
  @IsDate()
  @Type(() => Date)
  dataInicial: Date;
  @IsDate()
  @Type(() => Date)
  dataFinal: Date;
  @IsString()
  localEmbarqueIda: string;
  @IsString()
  localEmbarqueVolta: string;
  @IsNumber()
  valor: number;
  @IsDate()
  @Type(() => Date)
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
  @IsOptional()
  @IsString()
  descricao?: string;
}
