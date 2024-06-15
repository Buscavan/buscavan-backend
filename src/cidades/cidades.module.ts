import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';

@Module({
  providers: [CidadesService],
  controllers: [CidadesController],
})
export class CidadesModule {}
