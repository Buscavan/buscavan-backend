import { Module } from '@nestjs/common';
import { ViagemController } from './viagem.controller';
import { ViagemService } from './viagem.service';
import { CidadesModule } from 'src/cidades/cidades.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [CidadesModule, UploadModule],
  controllers: [ViagemController],
  providers: [ViagemService],
  exports: [ViagemService],
})
export class ViagemModule {}
