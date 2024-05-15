import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';

@Module({
  providers: [VeiculoService],
  controllers: [VeiculoController],
})
export class VeiculoModule {}
