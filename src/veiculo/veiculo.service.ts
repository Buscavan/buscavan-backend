import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVeiculoDto } from './dtos/create-veiculo.dto';
import { PrismaClient } from '@prisma/client';
import { PutVeiculoDto } from './dtos/put-veiculo.dto';
import { UploadService } from 'src/upload/upload.service';
import { JwtService } from '@nestjs/jwt';
import { createClient } from '@supabase/supabase-js';
import { FileDTO } from 'src/upload/dtos/upload.dto';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class VeiculoService {
  private readonly supabase;

  constructor(
    private readonly uploadService: UploadService,
    private readonly jwtService: JwtService,
  ) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseURL, supabaseKEY, {
      auth: { persistSession: false },
    });
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [, token] = authHeader.split(' ');
    return token;
  }

  async createVeiculo(dto: CreateVeiculoDto, file: FileDTO, request: any) {
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      const payload: any = this.jwtService.decode(token);
      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const cpf = payload.sub;

      let uuid;
      let uniqueFilename;

      while (true) {
        uuid = uuidv4();
        uniqueFilename = `${uuid}-perfil'`;

        const existingFile = await prisma.user.findUnique({
          where: { fotoPerfilUrl: uniqueFilename },
        });

        if (!existingFile) {
          break;
        }
      }

      const uploadResult = await this.uploadService.upload(
        file,
        `${uuid}-trip`,
      );
      const {
        data: { signedUrl },
        error: signedUrlError,
      } = await this.supabase.storage
        .from('buscavan')
        .createSignedUrl(uploadResult.data.path, 3155760000); // URL válida por 100 anos

      if (signedUrlError) {
        throw new Error(
          `Erro ao criar URL assinada: ${signedUrlError.message}`,
        );
      }

      const veiculo = await prisma.veiculo.create({
        data: {
          modelo: dto.modelo,
          placa: dto.placa,
          capacidade: dto.capacidade,
          motoristaCPF: cpf,
          fotoVeiculoUrl: signedUrl,
        },
      });
      return veiculo;
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      throw error;
    }
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
      where: { motoristaCPF: idMotorista },
    });
    return veiculos;
  }
}
