import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadioModule } from './estadio/estadio.module';
import { PrismaService } from 'prisma/prisma.service';
import { EquipoModule } from './equipo/equipo.module';
import { FutbolistaModule } from './futbolista/futbolista.module';
import { PartidoModule } from './partido/partido.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { LigaModule } from './liga/liga.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    EstadioModule,
    EquipoModule,
    FutbolistaModule,
    PartidoModule,
    UsuarioModule,
    AuthModule,
    LigaModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
