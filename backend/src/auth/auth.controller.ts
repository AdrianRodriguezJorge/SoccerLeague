import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { nombre: string; password: string }) {
    const { nombre, password } = body;
    return this.authService.authenticate(nombre, password);
  }

  @Put('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() body: { nombre: string; oldPassword: string; newPassword: string },
  ) {
    const { nombre, oldPassword, newPassword } = body;
    return this.authService.changePassword(nombre, oldPassword, newPassword);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}
