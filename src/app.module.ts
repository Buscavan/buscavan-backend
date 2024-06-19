import { Module } from '@nestjs/common';
import { ViagemController } from './viagem/viagem.controller';
import { ViagemService } from './viagem/viagem.service';
import { ViagemModule } from './viagem/viagem.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CidadesModule } from './cidades/cidades.module';
import { UploadModule } from './upload/upload.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { VeiculoService } from './veiculo/veiculo.service';
import { VeiculoController } from './veiculo/veiculo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ViagemModule,
    VeiculoModule,
    AuthModule,
    CidadesModule,
    UploadModule,
  ],
  controllers: [VeiculoController, ViagemController],
  providers: [
    VeiculoService,
    ViagemService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
