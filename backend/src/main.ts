import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SoccerLeague')
    .setDescription('Cambiar estooo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Middleware para redirigir de '/' a '/api'
  // app.use('/', (req, res) => {
  //   res.redirect('/api');
  // });

  // Configuración del ValidationPipe global con mensajes de error personalizados
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const messages = validationErrors.map(
        error => `${Object.values(error.constraints).join(', ')}`
      );
      return new BadRequestException(messages);
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
