import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

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

        return this.signIn(user.userId, user.username)
    }

    async validateUser(nombre: string, password: string) {
        this.logger.debug(`Validating user: ${JSON.stringify(nombre)}`);

        const user = await this.usuarioService.findByName(nombre);

        if (user) {
            this.logger.debug(`User found: ${JSON.stringify(user)}`);
        } else {
            this.logger.warn(`User not found: ${JSON.stringify(nombre)}`);
        }

        if (user && user.password === password) {
            this.logger.debug(`Password validation successful for user: ${JSON.stringify(nombre)}`);
            return {
                userId: user.id,
                username: user.nombre
            };
        }

        this.logger.warn(`Password validation failed for user: ${JSON.stringify(nombre)}`);
        return null;
    }

    async signIn(userId: number, username: string) {
        const tokenPayload = {
            sub: userId,
            username: username
        };

        const accesToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accesToken,
            username,
            userId
        }
    }
}
