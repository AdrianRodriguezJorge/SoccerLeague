import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PartidoService } from './partido.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';

@ApiTags('partidos')
@Controller('partidos')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los partidos' })
  async getAllPartidos() {
    return this.partidoService.getAllPartidos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un partido por ID' })
  @ApiParam({ name: 'id', description: 'ID del partido' })
  async getPartidoById(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.getPartidoById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo partido' })
  @ApiBody({ type: CreatePartidoDto })
  async createPartido(@Body() data: CreatePartidoDto) {
    return this.partidoService.createPartido(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un partido' })
  @ApiParam({ name: 'id', description: 'ID del partido' })
  @ApiBody({ type: UpdatePartidoDto })
  async updatePartido(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePartidoDto) {
    return this.partidoService.updatePartido(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un partido' })
  @ApiParam({ name: 'id', description: 'ID del partido' })
  async deletePartido(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.deletePartido(id);
  }
}
