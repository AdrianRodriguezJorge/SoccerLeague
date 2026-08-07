import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateFutbolistaDto {
  @ApiProperty()
  @IsInt({ message: 'El ID del equipo debe ser un número entero' })
  idequipo: number;

  @ApiProperty()
  @IsString({ message: 'El nombre del futbolista debe ser una cadena de caracteres' })
  nombre: string;

  @ApiProperty()
  @IsInt({ message: 'El número del futbolista debe ser un número entero' })
  numero: number;

  @ApiProperty()
  @IsInt({ message: 'Los años en el equipo deben ser un número entero' })
  añosenequipo: number;

  @ApiProperty()
  @IsString({ message: 'El tipo de futbolista debe ser una cadena de caracteres' })
  tipo: string;
}
