import { Module } from '@nestjs/common';
import { EstadioService } from './estadio.service';
import { EstadioController } from './estadio.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EstadioController],
  providers: [EstadioService, PrismaService],
})
export class EstadioModule {}
