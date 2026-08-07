import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Rol } from '@prisma/client';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  nombre: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El email debe ser una dirección de correo electrónico válida' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ enum: Rol })
  @IsEnum(Rol, { message: 'El rol debe ser uno de los siguientes valores: GESTOR o ADMINISTRADOR' })
  rol: Rol;
}
