import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
    private readonly logger = new Logger(UsuarioService.name);

    constructor(private prisma: PrismaService) { }

    async create(createUsuarioDto: CreateUsuarioDto) {
        this.logger.debug(`Creating user: ${createUsuarioDto.nombre}`);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);
        return this.prisma.usuario.create({
            data: {
                ...createUsuarioDto,
                password: hashedPassword,
            },
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
        const data = { ...updateUsuarioDto };
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }
        return this.prisma.usuario.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        this.logger.debug(`Removing user ID: ${id}`);
        return this.prisma.usuario.delete({
            where: { id },
        });
    }
}
