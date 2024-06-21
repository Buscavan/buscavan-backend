import { Controller, Get, Param, Query } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { Public } from 'src/auth/public.decorator';

@Controller('cidades')
export class CidadesController {
  constructor(private cidadesService: CidadesService) {}
  @Public()
  @Get('/estado')
  findAllEstados() {
    return this.cidadesService.getEstado();
  }

  @Public()
  @Get(':id')
  findAllCidadesByUf(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('nome') nome?: string,
  ) {
    return this.cidadesService.getCidadesbyIdEstado(id, page, limit, nome);
  }
}
