import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dtos/create-veiculo.dto';

@Controller('veiculo')
export class VeiculoController {
  constructor(private veiculosService: VeiculoService) {}
  @Post('/create')
  createVeiculo(@Body() dto: CreateVeiculoDto) {
    return this.veiculosService.createVeiculo(dto);
  }

  @Get()
  getVeiculos() {
    return this.veiculosService.getVeiculo();
  }

  @Get(':id')
  oneGetVeiculo(@Param('id') id: number) {
    return this.veiculosService.oneGetVeiculo(id);
  }

  @Delete(':id')
  deleteVeiculo(@Param('id') id: number) {
    return this.veiculosService.deleteVeiculo(id);
  }

  @Put(':id')
  updateVeiculo(
    @Param('id') id: number,
    @Body() data: { placa?: string; capacidade?: number; motoristaId?: number },
  ) {
    return this.veiculosService.updateVeiculo(id, data);
  }
}
