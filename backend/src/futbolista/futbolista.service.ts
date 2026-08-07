import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FutbolistaService {
  constructor(private prisma: PrismaService) {}

  async getAllFutbolistas() {
    return this.prisma.futbolista.findMany({ include: { equipo: true } });
  }

  async getFutbolistaById(id: number) {
    return this.prisma.futbolista.findUnique({
      where: { idfutbolista: id },
      include: { equipo: true },
    });
  }

  async createFutbolista(data: { idequipo: number; nombre: string; numero: number; añosenequipo: number; tipo: string }) {
    return this.prisma.futbolista.create({ data });
  }

  async updateFutbolista(id: number, data: { idequipo?: number; nombre?: string; numero?: number; añosenequipo?: number; tipo?: string }) {
    return this.prisma.futbolista.update({
      where: { idfutbolista: id },
      data,
    });
  }

  async deleteFutbolista(id: number) {
    return this.prisma.futbolista.delete({
      where: { idfutbolista: id },
    });
  }
}
