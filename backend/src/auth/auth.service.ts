import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) { }

    async authenticate(nombre: string, password: string) {
        this.logger.debug(`Authenticating user: ${JSON.stringify(nombre)}`);

        const user = await this.validateUser(nombre, password);

        if (!user) {
            this.logger.warn(`Authentication failed for user: ${JSON.stringify(nombre)}`);
            throw new UnauthorizedException();
        }

        this.logger.debug(`Authentication successful for user: ${JSON.stringify(nombre)}`);

        return this.signIn(user.userId, user.username, user.rol);
    }

    async validateUser(nombre: string, password: string) {
        this.logger.debug(`Validating user: ${JSON.stringify(nombre)}`);

        const user = await this.usuarioService.findByName(nombre);

        if (user) {
            this.logger.debug(`User found: ${JSON.stringify(user)}`);
        } else {
            this.logger.warn(`User not found: ${JSON.stringify(nombre)}`);
        }

        if (user && await bcrypt.compare(password, user.password)) {
            this.logger.debug(`Password validation successful for user: ${JSON.stringify(nombre)}`);
            return {
                userId: user.id,
                username: user.nombre,
                rol: user.rol,
            };
        }

        this.logger.warn(`Password validation failed for user: ${JSON.stringify(nombre)}`);
        return null;
    }

    async signIn(userId: number, username: string, rol: string) {
        const tokenPayload = {
            sub: userId,
            username: username,
            rol: rol,
        };

        const accesToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accesToken,
            username,
            userId,
            rol,
        };
    }
}
