import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetVeiculoDto {
  @ApiProperty()
  @IsString()
  placa: string;
  @IsNumber()
  capacidade: number;
  motorista: {
    name: string;
  };
}
