import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dtos/upload.dto';
import { UploadService } from './upload.service';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  supabaseURL = process.env.SUPABASE_URL;
  supabaseKEY = process.env.SUPABASE_KEY;

  supabase = createClient(this.supabaseURL, this.supabaseKEY, {
    auth: {
      persistSession: false,
    },
  });

  @Post('/user/passageiro/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileUser(@UploadedFile() file: FileDTO, @Param('id') id: number) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        fotoPassageiroUrl: data.signedUrl,
      },
    });

    return result;
  }

  @Post('/user/cnh/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCnh(@UploadedFile() file: FileDTO, @Param('id') id: number) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        fotoCnhUrl: data.signedUrl,
      },
    });

    return result;
  }

  @Post('/user/motorista/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileMotorista(
    @UploadedFile() file: FileDTO,
    @Param('id') id: number,
  ) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        fotoMotoristaUrl: data.signedUrl,
      },
    });

    return result;
  }

  @Post('/viagem/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileViagem(
    @UploadedFile() file: FileDTO,
    @Param('id') id: number,
  ) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }

    await prisma.viagem.update({
      where: { id: Number(id) },
      data: {
        fotoDestinoUrl: data.signedUrl,
      },
    });

    return result;
  }

  @Post('/veiculo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileVeiculo(
    @UploadedFile() file: FileDTO,
    @Param('id') id: number,
  ) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }

    await prisma.veiculo.update({
      where: { id: Number(id) },
      data: {
        fotoVeiculoUrl: data.signedUrl,
      },
    });

    return result;
  }
}
