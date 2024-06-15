import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CidadesService {
  async getEstado() {
    const estado = await prisma.estado.findMany();
    return estado;
  }
  async getCidadesbyIdEstado(id: string) {
    const cidades = await prisma.cidade.findMany({
      where: { uf: parseInt(id) },
    });
    return cidades;
  }
}
