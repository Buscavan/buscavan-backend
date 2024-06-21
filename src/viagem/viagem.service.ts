import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ViagemDto } from './dtos/viagem.dto';
import { UploadService } from 'src/upload/upload.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { createClient } from '@supabase/supabase-js';
import { JwtService } from '@nestjs/jwt';
import { FileDTO } from 'src/upload/dtos/upload.dto';
import { ViagemFilterDto } from './dtos/viagem-filter.dto';

const prisma = new PrismaClient();

@Injectable()
export class ViagemService {
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

  async createViagem(dto: ViagemDto, file: FileDTO, request: any) {
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

      const uploadResult = await this.uploadService.upload(
        file,
        `${dto.veiculoId}-trip`,
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

      const viagem = await prisma.viagem.create({
        data: {
          origem: { connect: { id: dto.origem.id } },
          destino: { connect: { id: dto.destino.id } },
          dataInicial: dto.dataInicial,
          dataFinal: dto.dataFinal,
          valor: dto.valor,
          localEmbarqueIda: dto.localEmbarqueIda,
          localEmbarqueVolta: dto.localEmbarqueVolta,
          fotoDestinoUrl: signedUrl,
          createdAt: dto.createdAt,
          descricao: dto.descricao,
          veiculo: { connect: { id: dto.veiculoId } },
          comentarios: dto.comentarios
            ? {
                create: dto.comentarios.map((comment) => ({
                  content: comment.content,
                  author: comment.author,
                  createdAt: comment.createdAt,
                  parentComment: comment.parentCommentId
                    ? { connect: { id: comment.parentCommentId } }
                    : undefined,
                })),
              }
            : undefined,
          usuario: { connect: { cpf } },
        },
      });
      return viagem;
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      throw error;
    }
  }

  async deleteViagem(id: number) {
    try {
      const viagem = await prisma.viagem.delete({
        where: {
          id: id,
        },
      });
      return viagem;
    } catch (error) {
      console.error('Erro ao deletar viagem:', error);
      throw error;
    }
  }

  async updateViagem(id: number, data: ViagemDto) {
    try {
      const updatedViagem = await prisma.viagem.update({
        where: {
          id: id,
        },
        data: {
          origem: data.origem ? { connect: { id: data.origem.id } } : undefined,
          destino: data.destino
            ? { connect: { id: data.destino.id } }
            : undefined,
          veiculo: data.veiculoId
            ? { connect: { id: data.veiculoId } }
            : undefined,
          localEmbarqueIda: data.localEmbarqueIda,
          localEmbarqueVolta: data.localEmbarqueVolta,
          valor: data.valor,
          fotoDestinoUrl: data.fotoDestinoUrl,
          dataInicial: data.dataInicial,
          dataFinal: data.dataFinal,
          descricao: data.descricao,
          comentarios: data.comentarios
            ? {
                upsert: data.comentarios.map((comment) => ({
                  where: { id: comment.id || 0 },
                  create: {
                    content: comment.content,
                    author: comment.author,
                    createdAt: comment.createdAt,
                    parentComment: comment.parentCommentId
                      ? { connect: { id: comment.parentCommentId } }
                      : undefined,
                  },
                  update: {
                    content: comment.content,
                    author: comment.author,
                    createdAt: comment.createdAt,
                    parentComment: comment.parentCommentId
                      ? { connect: { id: comment.parentCommentId } }
                      : undefined,
                  },
                })),
              }
            : undefined,
        },
      });
      return updatedViagem;
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      throw error;
    }
  }

  async findAllByMotoristaId(idMotorista: string) {
    try {
      const viagens = await prisma.viagem.findMany({
        where: { usuarioId: idMotorista },
      });
      return viagens;
    } catch (error) {
      console.error('Erro ao buscar viagens por motorista:', error);
      throw error;
    }
  }

  async findViagemById(id: number) {
    try {
      const viagem = await prisma.viagem.findUnique({
        where: { id },
        include: { comentarios: true, veiculo: true },
      });
      return viagem;
    } catch (error) {
      console.error('Erro ao buscar viagem por ID:', error);
      throw error;
    }
  }

  async addComment(id: number, comment: CreateCommentDto) {
    try {
      const newComment = await prisma.comment.create({
        data: {
          content: comment.content,
          author: comment.author,
          createdAt: new Date(),
          viagem: { connect: { id } },
          parentComment: comment.parentCommentId
            ? { connect: { id: comment.parentCommentId } }
            : undefined,
        },
      });
      return newComment;
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      throw error;
    }
  }

  async getViagens() {
    const viagens = await prisma.viagem.findMany({
      include: {
        veiculo: {
          include: {
            motorista: {
              select: {
                phone: true, // Inclui apenas o campo 'phone' do usuário
              },
            },
          },
        },
        origem: true,
        destino: true,
      },
    });
    return viagens;
  }

  async getVeiculoByPlaca(placa: string) {
    try {
      const veiculo = await prisma.veiculo.findUnique({
        where: { placa },
      });
      return veiculo;
    } catch (error) {
      console.error('Erro ao buscar veículo por placa:', error);
      throw error;
    }
  }

  async getViagensByFilter(filterDto: ViagemFilterDto) {
    const where: any = {};

    if (filterDto.origemId) {
      where.origemId = parseInt(filterDto.origemId as any);
    }

    if (filterDto.destinoId) {
      where.destinoId = parseInt(filterDto.destinoId as any);
    }

    if (filterDto.dataInicial) {
      where.dataInicial = {
        gte: new Date(filterDto.dataInicial),
      };
    }

    if (filterDto.dataFinal) {
      where.dataFinal = {
        lte: new Date(filterDto.dataInicial),
      };
    }

    return prisma.viagem.findMany({
      where,
      include: {
        veiculo: {
          include: {
            motorista: {
              select: {
                phone: true,
              },
            },
          },
        },
        origem: true,
        destino: true,
      },
    });
  }
}
