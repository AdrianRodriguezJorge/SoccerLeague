import { Controller, Get, Post, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportesService } from './reportes.service';

@ApiTags('reportes')
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('posiciones')
  @ApiOperation({ summary: 'Obtener tabla de posiciones' })
  async getPosiciones() {
    return this.reportesService.getPosiciones();
  }

  @Get('partidos-entre-equipos')
  @ApiOperation({ summary: 'Obtener partidos cara a cara entre dos equipos' })
  async getPartidosEntreEquipos(
    @Query('equipo1') equipo1: string,
    @Query('equipo2') equipo2: string,
  ) {
    return this.reportesService.getPartidosEntreEquipos(equipo1, equipo2);
  }

  @Get('estado-del-equipo')
  @ApiOperation({ summary: 'Obtener desglose de estado de un equipo por nombre' })
  async getEstadoDelEquipo(@Query('nombre') nombre: string) {
    return this.reportesService.getEstadoDelEquipo(nombre);
  }

  @Get('audiencia')
  @ApiOperation({ summary: 'Obtener porcentaje de audiencia de los estadios' })
  async getAudiencia() {
    return this.reportesService.getAudiencia();
  }

  @Post('enviar-pdf')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Enviar reporte en formato PDF por correo electrónico' })
  async enviarPdf(
    @UploadedFile() file: any,
    @Body('email') email: string,
  ) {
    const filename = file ? file.originalname : 'reporte.pdf';
    const bufferLength = file ? file.buffer.length : 0;
    return this.reportesService.enviarReporte(email, filename, bufferLength);
  }
}
