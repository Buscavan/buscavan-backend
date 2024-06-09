import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PutVeiculoDto {
  @ApiProperty()
  @IsString()
  placa?: string;
  @ApiProperty()
  @IsNumber()
  capacidade?: number;
  @ApiProperty()
  @IsNumber()
  motoristaid?: number;
}
