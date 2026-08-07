import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateEquipoDto {
  @ApiProperty()
  @IsString({ message: 'El nombre del equipo debe ser una cadena de caracteres' })
  nomequipo: string;

  @ApiProperty()
  @IsString({ message: 'La provincia debe ser una cadena de caracteres' })
  provincia: string;

  @ApiProperty()
  @IsInt({ message: 'El número de campeonatos participados debe ser un número entero' })
  camparticip: number;

  @ApiProperty()
  @IsInt({ message: 'El número de campeonatos ganados debe ser un número entero' })
  campganados: number;

  @ApiProperty()
  @IsString({ message: 'La mascota debe ser una cadena de caracteres' })
  mascota: string;

  @ApiProperty()
  @IsString({ message: 'El color debe ser una cadena de caracteres' })
  color: string;

  @ApiProperty()
  @IsInt({ message: 'El campo "puntos" debe ser un número entero' })
  puntos: number;
}
