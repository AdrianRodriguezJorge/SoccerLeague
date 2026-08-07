import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
    private readonly logger = new Logger(UsuarioService.name);

    constructor(private prisma: PrismaService) { }

    async create(createUsuarioDto: CreateUsuarioDto) {
        this.logger.debug(`Creating user: ${createUsuarioDto.nombre}`);
        return this.prisma.usuario.create({
            data: createUsuarioDto,
        });
    }

    async findAll() {
        this.logger.debug('Finding all users');
        return this.prisma.usuario.findMany();
    }

    async findByName(nombre: string) {
        this.logger.debug(`Finding user by name: ${JSON.stringify(nombre)}`);
        return this.prisma.usuario.findFirst({
            where: { 
                nombre: {
                    contains: nombre,
                    mode: 'insensitive',
                },
            },
        });
    }

    async findOne(id: number) {
        this.logger.debug(`Finding user by ID: ${id}`);
        return this.prisma.usuario.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        this.logger.debug(`Updating user ID: ${id}`);
        return this.prisma.usuario.update({
            where: { id },
            data: updateUsuarioDto,
        });
    }

    async remove(id: number) {
        this.logger.debug(`Removing user ID: ${id}`);
        return this.prisma.usuario.delete({
            where: { id },
        });
    }
}
