import { Module } from '@nestjs/common';
import { PartidoController } from './partido.controller';
import { PartidoService } from './partido.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PartidoController],
  providers: [PartidoService, PrismaService]
})
export class PartidoModule {}
