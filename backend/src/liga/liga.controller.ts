import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LigaService } from './liga.service';

@ApiTags('liga')
@Controller('liga')
export class LigaController {
  constructor(private readonly ligaService: LigaService) {}

  @Post('iniciar')
  @ApiOperation({ summary: 'Iniciar la liga con fechas de inicio y fin' })
  async iniciarLiga(@Body() body: { fechaInicio: string; fechaFin: string }) {
    const { fechaInicio, fechaFin } = body;
    return this.ligaService.iniciarLiga(fechaInicio, fechaFin);
  }

  @Get('fechas')
  @ApiOperation({ summary: 'Obtener las fechas de la liga registrada' })
  async getFechas() {
    return this.ligaService.getFechas();
  }
}
