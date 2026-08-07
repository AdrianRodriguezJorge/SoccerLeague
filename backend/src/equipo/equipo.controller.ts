import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@ApiTags('equipos')
@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  async getAllEquipos() {
    return this.equipoService.getAllEquipos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiParam({ name: 'id', description: 'ID del equipo' })
  async getEquipoById(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.getEquipoById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiBody({ type: CreateEquipoDto })
  async createEquipo(@Body() data: CreateEquipoDto) {
    return this.equipoService.createEquipo(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo' })
  @ApiParam({ name: 'id', description: 'ID del equipo' })
  @ApiBody({ type: UpdateEquipoDto })
  async updateEquipo(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEquipoDto,
  ) {
    return this.equipoService.updateEquipo(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo' })
  @ApiParam({ name: 'id', description: 'ID del equipo' })
  async deleteEquipo(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.deleteEquipo(id);
  }
}
