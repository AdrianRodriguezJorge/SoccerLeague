import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EquipoService {
  constructor(private prisma: PrismaService) {}

  async getAllEquipos() {
    return this.prisma.equipo.findMany({ include: { futbolistas: true } });
  }

  async getEquipoById(id: number) {
    return this.prisma.equipo.findUnique({
      where: { idequipo: id },
      include: { futbolistas: true },
    });
  }

  async createEquipo(data: { nomequipo: string; provincia: string; camparticip: number; campganados: number; mascota: string; color: string; puntos: number }) {
    return this.prisma.equipo.create({ data });
  }

  async updateEquipo(id: number, data: { nomequipo?: string; provincia?: string; camparticip?: number; campganados?: number; mascota?: string; color?: string; puntos?: number }) {
    return this.prisma.equipo.update({
      where: { idequipo: id },
      data,
    });
  }

  async deleteEquipo(id: number) {
    return this.prisma.equipo.delete({
      where: { idequipo: id },
    });
  }
}
