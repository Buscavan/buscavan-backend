import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ViagemController } from './viagem/viagem.controller';
import { ViagemService } from './viagem/viagem.service';
import { ViagemModule } from './viagem/viagem.module';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [UsersModule, ViagemModule, VeiculoModule],
  controllers: [ViagemController],
  providers: [UsersService, ViagemService],
})
export class AppModule {}
