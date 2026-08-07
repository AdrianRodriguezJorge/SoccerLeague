import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReportesService {
  private readonly logger = new Logger(ReportesService.name);

  constructor(private prisma: PrismaService) {}

  async getPosiciones() {
    const equipos = await this.prisma.equipo.findMany();
    const partidos = await this.prisma.partido.findMany();

    const tabla = equipos.map(equipo => {
      let partidosJugados = 0;
      let ganados = 0;
      let empatados = 0;
      let perdidos = 0;

      partidos.forEach(p => {
        if (p.local === equipo.idequipo) {
          partidosJugados++;
          if (p.goles_local > p.goles_visitante) {
            ganados++;
          } else if (p.goles_local === p.goles_visitante) {
            empatados++;
          } else {
            perdidos++;
          }
        } else if (p.visitante === equipo.idequipo) {
          partidosJugados++;
          if (p.goles_visitante > p.goles_local) {
            ganados++;
          } else if (p.goles_local === p.goles_visitante) {
            empatados++;
          } else {
            perdidos++;
          }
        }
      });

      const puntos = ganados * 3 + empatados;

      return {
        equipo: equipo.nomequipo,
        partidosJugados,
        ganados,
        empatados,
        perdidos,
        puntos,
      };
    });

    return tabla.sort((a, b) => b.puntos - a.puntos);
  }

  async getPartidosEntreEquipos(equipo1: string, equipo2: string) {
    const e1 = await this.prisma.equipo.findFirst({
      where: { nomequipo: { equals: equipo1, mode: 'insensitive' } },
    });
    const e2 = await this.prisma.equipo.findFirst({
      where: { nomequipo: { equals: equipo2, mode: 'insensitive' } },
    });

    if (!e1 || !e2) return [];

    return this.prisma.partido.findMany({
      where: {
        OR: [
          { local: e1.idequipo, visitante: e2.idequipo },
          { local: e2.idequipo, visitante: e1.idequipo },
        ],
      },
      include: {
        estadio: true,
        equipoLocal: true,
        equipoVisitante: true,
      },
    });
  }

  async getEstadoDelEquipo(nombre: string) {
    const equipo = await this.prisma.equipo.findFirst({
      where: { nomequipo: { equals: nombre, mode: 'insensitive' } },
    });

    if (!equipo) return null;

    const partidos = await this.prisma.partido.findMany();
    let localGanados = 0;
    let localEmpatados = 0;
    let localPerdidos = 0;
    let visitanteGanados = 0;
    let visitanteEmpatados = 0;
    let visitantePerdidos = 0;

    partidos.forEach(p => {
      if (p.local === equipo.idequipo) {
        if (p.goles_local > p.goles_visitante) {
          localGanados++;
        } else if (p.goles_local === p.goles_visitante) {
          localEmpatados++;
        } else {
          localPerdidos++;
        }
      } else if (p.visitante === equipo.idequipo) {
        if (p.goles_visitante > p.goles_local) {
          visitanteGanados++;
        } else if (p.goles_local === p.goles_visitante) {
          visitanteEmpatados++;
        } else {
          visitantePerdidos++;
        }
      }
    });

    return {
      totalGanados: localGanados + visitanteGanados,
      localGanados,
      visitanteGanados,
      totalEmpatados: localEmpatados + visitanteEmpatados,
      localEmpatados,
      visitanteEmpatados,
      totalPerdidos: localPerdidos + visitantePerdidos,
      localPerdidos,
      visitantePerdidos,
    };
  }

  async getAudiencia() {
    const estadios = await this.prisma.estadio.findMany();
    const partidos = await this.prisma.partido.findMany();

    const data = estadios.map(estadio => {
      const partidosDeEstadio = partidos.filter(p => p.fkestadio === estadio.idestadio);
      const sumAudiencia = partidosDeEstadio.reduce((sum, p) => sum + p.audiencia, 0);
      const countPartidos = partidosDeEstadio.length;
      const avgAudiencia = countPartidos > 0 ? sumAudiencia / countPartidos : 0;
      const pct = estadio.capacidad > 0 ? (avgAudiencia / estadio.capacidad * 100).toFixed(2) : '0.00';

      return {
        estadio: estadio.nomestadio,
        audiencia: `${pct}% (${Math.round(avgAudiencia)} espectadores de promedio)`,
      };
    });

    return data.sort((a, b) => parseFloat(b.audiencia) - parseFloat(a.audiencia));
  }

  async getPartidosPorFecha(fecha: string, estadioName?: string) {
    const partidos = await this.prisma.partido.findMany({
      include: { estadio: true, equipoLocal: true, equipoVisitante: true },
    });

    const filtrados = partidos.filter(p => {
      const matchFecha = p.fecha ? p.fecha.toISOString().slice(0, 10) === fecha : false;
      const matchEstadio = estadioName && estadioName !== 'Todos'
        ? p.estadio.nomestadio.toLowerCase() === estadioName.toLowerCase()
        : true;
      return matchFecha && matchEstadio;
    });

    return filtrados.map(p => ({
      fecha: p.fecha ? p.fecha.toISOString().slice(0, 10) : '',
      estadio: p.estadio.nomestadio,
      local: p.equipoLocal.nomequipo,
      visitante: p.equipoVisitante.nomequipo,
      resultado: `${p.goles_local} - ${p.goles_visitante}`,
    }));
  }

  async enviarReporte(email: string, filename: string, fileBufferLength: number) {
    this.logger.log(`Enviando reporte PDF por correo a: ${email}. Archivo: ${filename} (Tamaño: ${fileBufferLength} bytes)`);
    // Emulación del envío de correo
    return {
      success: true,
      message: 'Reporte enviado al correo exitosamente',
    };
  }
}
