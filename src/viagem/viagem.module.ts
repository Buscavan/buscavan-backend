import { Module } from '@nestjs/common';
import { ViagemController } from './viagem.controller';
import { ViagemService } from './viagem.service';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService],
})
export class ViagemModule {}
