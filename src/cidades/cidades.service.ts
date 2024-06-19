import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CidadesService {
  async getEstado() {
    const estado = await prisma.estado.findMany();
    return estado;
  }
  async getCidadesbyIdEstado(id: string, page: number, limit: number) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;
    const take = limit;

    const cidades = await prisma.cidade.findMany({
      where: { uf: parseInt(id) },
      skip: skip,
      take: take,
    });

    const totalCidades = await prisma.cidade.count({
      where: { uf: parseInt(id) },
    });

    return {
      data: cidades,
      page: page,
      limit: limit,
      total: totalCidades,
      totalPages: Math.ceil(totalCidades / limit),
    };
  }
}
