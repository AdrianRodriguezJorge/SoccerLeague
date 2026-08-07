import { Module } from '@nestjs/common';
import { LigaService } from './liga.service';
import { LigaController } from './liga.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [LigaController],
  providers: [LigaService, PrismaService],
})
export class LigaModule {}
