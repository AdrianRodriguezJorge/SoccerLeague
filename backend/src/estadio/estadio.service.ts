import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EstadioService {
  constructor(private prisma: PrismaService) {}

  async getAllEstadios() {
    return this.prisma.estadio.findMany();
  }

  async getEstadioById(id: number) {
    return this.prisma.estadio.findUnique({
      where: { idestadio: id },
    });
  }

  async createEstadio(data: { nomestadio: string; capacidad: number }) {
    return this.prisma.estadio.create({ data });
  }

  async updateEstadio(
    id: number,
    data: { nomestadio?: string; capacidad?: number },
  ) {
    return this.prisma.estadio.update({
      where: { idestadio: id },
      data,
    });
  }

  async deleteEstadio(id: number) {
    return this.prisma.estadio.delete({
      where: { idestadio: id },
    });
  }
}
