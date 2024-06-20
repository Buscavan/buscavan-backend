import { Injectable } from '@nestjs/common';
import { FileDTO } from './dtos/upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async upload(file: FileDTO, name: string) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const datas = await supabase.storage
      .from('buscavan')
      .upload(name, file.buffer, {
        upsert: true,
      });

    return datas;
  }
}
