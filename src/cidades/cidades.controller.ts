import { Controller, Get, Param } from '@nestjs/common';
import { CidadesService } from './cidades.service';

@Controller('cidades')
export class CidadesController {
  constructor(private cidadesService: CidadesService) {}
  @Get('/estado')
  findAllEstados() {
    return this.cidadesService.getEstado();
  }
  @Get(':id')
  findAllCidadesByUf(@Param('id') id: string) {
    return this.cidadesService.getCidadesbyIdEstado(id);
  }
}
