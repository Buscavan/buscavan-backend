import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CidadesService {
  async getEstado() {
    const estado = await prisma.estado.findMany();
    return estado;
  }
  async getCidadesbyIdEstado(
    id: string,
    page: number,
    limit: number,
    nome?: string,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { uf: parseInt(id) };
    if (nome) {
      where.nome = {
        contains: nome,
        mode: 'insensitive', // This makes the search case-insensitive
      };
    }

    const cidades = await prisma.cidade.findMany({
      where,
      skip,
      take,
    });

    const totalCidades = await prisma.cidade.count({
      where,
    });

    return {
      data: cidades,
      page,
      limit,
      total: totalCidades,
      totalPages: Math.ceil(totalCidades / limit),
    };
  }
}
