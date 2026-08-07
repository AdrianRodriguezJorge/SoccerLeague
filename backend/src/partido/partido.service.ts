import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PartidoService {
  constructor(private prisma: PrismaService) {}

  async getAllPartidos() {
    return this.prisma.partido.findMany({
      include: { estadio: true, equipoLocal: true, equipoVisitante: true },
    });
  }

  async getPartidoById(id: number) {
    return this.prisma.partido.findUnique({
      where: { idpartido: id },
      include: { estadio: true, equipoLocal: true, equipoVisitante: true },
    });
  }

  async createPartido(data: {
    audiencia: number;
    fecha: string;
    fkestadio: number;
    local: number;
    visitante: number;
    goles_local: number;
    goles_visitante: number;
  }) {
    return this.prisma.partido.create({
      data,
    });
  }

  async updatePartido(
    id: number,
    data: {
      audiencia?: number;
      fecha?: string;
      fkestadio?: number;
      local?: number;
      visitante?: number;
      goles_local?: number;
      goles_visitante?: number;
    },
  ) {
    return this.prisma.partido.update({
      where: { idpartido: id },
      data,
    });
  }

  async deletePartido(id: number) {
    return this.prisma.partido.delete({
      where: { idpartido: id },
    });
  }
}
