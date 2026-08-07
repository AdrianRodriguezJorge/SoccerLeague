import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

import { JWT_SECRET } from "src/config/jwt-secret";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,  // Corrected spelling
        });
    }

    async validate(payload: { sub: string, username: string, rol: string }) {
        return { userId: payload.sub, username: payload.username, rol: payload.rol };
    }
}
