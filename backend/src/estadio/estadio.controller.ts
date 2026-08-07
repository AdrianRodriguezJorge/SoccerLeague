import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { EstadioService } from './estadio.service';
import { CreateEstadioDto } from './dto/create-estadio.dto';
import { UpdateEstadioDto } from './dto/update-estadio.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';

@ApiTags('estadios')
@Controller('estadios')
export class EstadioController {
  constructor(private readonly estadioService: EstadioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estadios' })
  async getAllEstadios() {
    return this.estadioService.getAllEstadios();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estadio por ID' })
  @ApiParam({ name: 'id', description: 'ID del estadio' })
  async getEstadioById(@Param('id', ParseIntPipe) id: number) {
    return this.estadioService.getEstadioById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estadio' })
  @ApiBody({ type: CreateEstadioDto })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Gestor)
  async createEstadio(@Body() data: CreateEstadioDto) {
    return this.estadioService.createEstadio(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un estadio' })
  @ApiParam({ name: 'id', description: 'ID del estadio' })
  @ApiBody({ type: UpdateEstadioDto })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Gestor)
  async updateEstadio(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEstadioDto) {
    return this.estadioService.updateEstadio(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estadio' })
  @ApiParam({ name: 'id', description: 'ID del estadio' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Gestor)
  async deleteEstadio(@Param('id', ParseIntPipe) id: number) {
    return this.estadioService.deleteEstadio(id);
  }
}
