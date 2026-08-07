import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateEstadioDto {
  @ApiProperty({ description: 'Nombre del estadio' })
  @IsString({ message: 'El nombre del estadio debe ser una cadena de caracteres' })
  nomestadio: string;

  @ApiProperty({ description: 'Capacidad del estadio' })
  @IsInt({ message: 'La capacidad del estadio debe ser un número entero' })
  capacidad: number;
}
