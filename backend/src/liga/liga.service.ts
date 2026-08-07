import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LigaService {
  constructor(private prisma: PrismaService) {}

  async iniciarLiga(fechaInicio: string, fechaFin: string) {
    // Eliminar las fechas de liga anteriores para tener un único registro activo
    await this.prisma.liga.deleteMany();
    return this.prisma.liga.create({
      data: {
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
      },
    });
  }

  async getFechas() {
    return this.prisma.liga.findMany();
  }
}
