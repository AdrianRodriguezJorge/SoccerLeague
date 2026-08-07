import { Module } from '@nestjs/common';
import { FutbolistaService } from './futbolista.service';
import { FutbolistaController } from './futbolista.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [FutbolistaController],
  providers: [FutbolistaService, PrismaService],
})
export class FutbolistaModule {}
