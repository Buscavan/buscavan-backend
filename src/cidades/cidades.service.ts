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

  async searchCidades(query?: string, limit: number = 10) {
    const where: any = {};

    if (query) {
      const [cityPart, statePart] = query.split(',').map((part) => part.trim());

      if (cityPart) {
        where.nome = {
          contains: cityPart,
          mode: 'insensitive',
        };
      }

      if (statePart) {
        const state = await prisma.estado.findFirst({
          where: {
            nome: {
              contains: statePart,
              mode: 'insensitive',
            },
          },
        });
        if (state) {
          where.uf = state.id;
        }
      }
    }

    if (Object.keys(where).length === 0) {
      // No query provided, return 10 random cities
      const totalCidades = await prisma.cidade.count();
      const randomOffset = Math.max(
        0,
        Math.floor(Math.random() * (totalCidades - limit)),
      );
      const cidades = await prisma.cidade.findMany({
        skip: randomOffset,
        take: limit,
      });
      return cidades;
    }

    const cidades = await prisma.cidade.findMany({
      where,
      take: limit,
    });

    return cidades;
  }
}
