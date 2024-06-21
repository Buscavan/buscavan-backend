import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dtos/create-veiculo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('veiculo')
export class VeiculoController {
  constructor(private veiculosService: VeiculoService) {}

  @Roles(Role.DRIVER)
  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createVeiculo(
    @Body() dtoString: CreateVeiculoDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    return this.veiculosService.createVeiculo(dtoString, file, request);
  }
  @Roles(Role.DRIVER)
  @Get(':id')
  findAllbyMotoristaId(@Param('id') id: string) {
    return this.veiculosService.findAllbyMotoristaId(id);
  }
  @Roles(Role.DRIVER)
  @Delete(':id')
  deleteVeiculo(@Param('id') id: number) {
    return this.veiculosService.deleteVeiculo(id);
  }
  @Roles(Role.DRIVER)
  @Put(':id')
  updateVeiculo(
    @Param('id') id: number,
    @Body()
    data: { placa?: string; capacidade?: number; motoristaCPF?: string },
  ) {
    return this.veiculosService.updateVeiculo(id, data);
  }
}
