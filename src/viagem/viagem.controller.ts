import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { ViagemService } from './viagem.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ViagemDto } from './dtos/viagem.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('viagem')
export class ViagemController {
  constructor(private viagemService: ViagemService) {}

  @Roles(Role.DRIVER)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createViagem(
    @Body() dto: ViagemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.viagemService.createViagem(dto, file);
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get(':id')
  findViagemById(@Param('id') id: number) {
    return this.viagemService.findViagemById(id);
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get('/motorista/:id')
  findAllByMotoristaId(@Param('id') id: string) {
    return this.viagemService.findAllByMotoristaId(id);
  }

  @Roles(Role.DRIVER)
  @Delete(':id')
  deleteViagem(@Param('id') id: number) {
    return this.viagemService.deleteViagem(id);
  }

  @Roles(Role.DRIVER)
  @Put(':id')
  updateViagem(@Param('id') id: number, @Body() dto: ViagemDto) {
    return this.viagemService.updateViagem(id, dto);
  }

  @Roles(Role.PASSANGER)
  @Post(':id/comment')
  addComment(@Param('id') id: number, @Body() comment: CreateCommentDto) {
    return this.viagemService.addComment(id, comment);
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get('/destinos')
  getCidades() {
    return this.viagemService.getCidades();
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get('/veiculo/:placa')
  getVeiculoByPlaca(@Param('placa') placa: string) {
    return this.viagemService.getVeiculoByPlaca(placa);
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get('/estados')
  getEstados() {
    return this.viagemService.getEstados();
  }

  @Roles(Role.DRIVER, Role.PASSANGER)
  @Get('/cidades/:id')
  getCidadesByEstado(
    @Param('id') id: string,
    @Param('page') page: number = 1,
    @Param('limit') limit: number = 10,
  ) {
    return this.viagemService.getCidadesByEstado(id, page, limit);
  }
}
