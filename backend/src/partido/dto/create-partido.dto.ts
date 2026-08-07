import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreatePartidoDto {
  @ApiProperty()
  @IsInt({ message: 'La audiencia debe ser un número entero' })
  audiencia: number;

  @ApiProperty()
  @IsDateString({ 
    // message: 'La fecha debe ser una fecha válida en formato ISO 8601' 
  })
  fecha: string;

  @ApiProperty()
  @IsInt({ message: 'El ID del estadio debe ser un número entero' })
  fkestadio: number;

  @ApiProperty()
  @IsInt({ message: 'El ID del equipo local debe ser un número entero' })
  local: number;

  @ApiProperty()
  @IsInt({ message: 'El ID del equipo visitante debe ser un número entero' })
  visitante: number;

  @ApiProperty()
  @IsInt({ message: 'La cantidad de goles del equipo local debe ser un número entero' })
  goles_local: number;

  @ApiProperty()
  @IsInt({ message: 'La cantidad de goles del equipo visitante debe ser un número entero' })
  goles_visitante: number;
}
