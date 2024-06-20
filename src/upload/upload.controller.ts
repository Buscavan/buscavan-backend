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
import { v4 as uuidv4 } from 'uuid';

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

  @Post('/user/perfil/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileUser(
    @UploadedFile() file: FileDTO,
    @Param('id') cpf: string,
  ) {
    let uuid;
    let uniqueFilename;

    while (true) {
      uuid = uuidv4();
      uniqueFilename = `${uuid}-${'perfil'}`;

      const existingFile = await prisma.user.findUnique({
        where: { fotoPerfilUrl: uniqueFilename },
      });

      if (!existingFile) {
        break;
      }
    }

    const result = await this.uploadService.upload(file, uniqueFilename);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(uniqueFilename, 3155760000);

    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }

    await prisma.user.update({
      where: { cpf: cpf },
      data: {
        fotoPerfilUrl: data.signedUrl,
      },
    });
    return result;
  }

  @Post('/user/cnh/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCnh(@UploadedFile() file: FileDTO, @Param('id') cpf: string) {
    let uuid;
    let uniqueFilename;

    while (true) {
      uuid = uuidv4();
      uniqueFilename = `${uuid}-${'cnh'}`;

      const existingFile = await prisma.user.findUnique({
        where: { fotoPerfilUrl: uniqueFilename },
      });

      if (!existingFile) {
        break;
      }
    }

    const result = await this.uploadService.upload(file, uniqueFilename);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(uniqueFilename, 3155760000);
    if (error) {
      throw new Error(`Erro ao criar URL assinada: ${error.message}`);
    }
    await prisma.user.update({
      where: { cpf: cpf },
      data: {
        fotoCnhUrl: data.signedUrl,
      },
    });
    return result;
  }

  @Post('/trip/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileViagem(
    @UploadedFile() file: FileDTO,
    @Param('id') id: number,
  ) {
    let uuid;
    let uniqueFilename;

    while (true) {
      uuid = uuidv4();
      uniqueFilename = `${uuid}-${'trip'}`;

      const existingFile = await prisma.user.findUnique({
        where: { fotoPerfilUrl: uniqueFilename },
      });

      if (!existingFile) {
        break;
      }
    }
    const result = await this.uploadService.upload(file, uniqueFilename);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(uniqueFilename, 3155760000);

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

  @Post('/vehicle/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileVeiculo(
    @UploadedFile() file: FileDTO,
    @Param('id') id: number,
  ) {
    let uuid;
    let uniqueFilename;

    while (true) {
      uuid = uuidv4();
      uniqueFilename = `${uuid}-${'vehicle'}`;

      const existingFile = await prisma.user.findUnique({
        where: { fotoPerfilUrl: uniqueFilename },
      });

      if (!existingFile) {
        break;
      }
    }
    const result = await this.uploadService.upload(file, uniqueFilename);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(uniqueFilename, 3155760000);

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
