import { Injectable } from '@nestjs/common';
import { CreateVeiculoDto } from './dtos/create-veiculo.dto';
import { PrismaClient } from '@prisma/client';
import { PutVeiculoDto } from './dtos/put-veiculo.dto';

const prisma = new PrismaClient();

@Injectable()
export class VeiculoService {
  async createVeiculo(dto: CreateVeiculoDto) {
    const veiculo = await prisma.veiculo.create({
      data: {
        placa: dto.placa,
        capacidade: dto.capacidade,
        motoristaId: dto.motoristaid,
      },
    });
    return veiculo;
  }
  async deleteVeiculo(id: number) {
    const veiculo = await prisma.veiculo.delete({
      where: {
        id: id,
      },
    });
    return veiculo;
  }
  async updateVeiculo(id: number, data: PutVeiculoDto) {
    try {
      const updatedVeiculo = await prisma.veiculo.update({
        where: {
          id: id,
        },
        data: data,
      });
      return updatedVeiculo;
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      throw error;
    }
  }
  async findAllbyMotoristaId(idMotorista: string) {
    const veiculos = await prisma.veiculo.findMany({
      where: { motoristaId: parseInt(idMotorista) },
    });
    return veiculos;
  }
}
