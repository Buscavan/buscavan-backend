import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ViagemController } from './viagem/viagem.controller';
import { ViagemService } from './viagem/viagem.service';
import { ViagemModule } from './viagem/viagem.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CidadesModule } from './cidades/cidades.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ViagemModule,
    VeiculoModule,
    AuthModule,
    CidadesModule,
    UploadModule,
  ],
  controllers: [ViagemController],
  providers: [UsersService, ViagemService],
})
export class AppModule {}
