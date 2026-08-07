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
import { FutbolistaService } from './futbolista.service';
import { CreateFutbolistaDto } from './dto/create-futbolista.dto';
import { UpdateFutbolistaDto } from './dto/update-futbolista.dto';

@ApiTags('futbolistas')
@Controller('futbolistas')
export class FutbolistaController {
  constructor(private readonly futbolistaService: FutbolistaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los futbolistas' })
  async getAllFutbolistas() {
    return this.futbolistaService.getAllFutbolistas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un futbolista por ID' })
  @ApiParam({ name: 'id', description: 'ID del futbolista' })
  async getFutbolistaById(@Param('id', ParseIntPipe) id: number) {
    return this.futbolistaService.getFutbolistaById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo futbolista' })
  @ApiBody({ type: CreateFutbolistaDto })
  async createFutbolista(@Body() data: CreateFutbolistaDto) {
    return this.futbolistaService.createFutbolista(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un futbolista' })
  @ApiParam({ name: 'id', description: 'ID del futbolista' })
  @ApiBody({ type: UpdateFutbolistaDto })
  async updateFutbolista(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFutbolistaDto,
  ) {
    return this.futbolistaService.updateFutbolista(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un futbolista' })
  @ApiParam({ name: 'id', description: 'ID del futbolista' })
  async deleteFutbolista(@Param('id', ParseIntPipe) id: number) {
    return this.futbolistaService.deleteFutbolista(id);
  }
}
