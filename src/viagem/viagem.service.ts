import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetViagemDto } from './dtos/get-veiculo.dto';

const prisma = new PrismaClient();

@Injectable()
export class ViagemService {
  async findViagens(dto: GetViagemDto) {
    const filter: any = {};
    if (origem) filter.origem.nome = dto.origem.nome;
    if (destino) filter.destino.nome = dto.destino.nome;
    if (valor) filter.valor = dto.valor;
    if (modelo) filter.veiculo.modelo = dto.veiculo.modelo;
    if (foto) filter.veiculo.foto = dto.veiculo.foto;

    const orderBy: any = {};
    if (orderBy === 'asc') orderBy.valor = 'asc';
    if (orderBy === 'desc') orderBy.valor = 'desc';

    const viagens = await prisma.viagem.findMany({
      where: filter,
      orderBy,
    });

    return viagens;
  }
}
