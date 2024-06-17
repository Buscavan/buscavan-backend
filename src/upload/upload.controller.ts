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

  @Post('/user/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileUser(@UploadedFile() file: FileDTO, @Param('id') id: number) {
    const result = await this.uploadService.upload(file);
    const { data, error } = await this.supabase.storage
      .from('buscavan')
      .createSignedUrl(file.originalname, 3155760000);

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        fotoPassageiroUrl: data.signedUrl,
      },
    });

    return result;
  }
}
