import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transforma los datos de la request a los dtos
      transformOptions: {
        enableImplicitConversion: true, // convierte los datos de la request a los dtos
      }
    })
  )

  await app.listen(process.env.PORT! as string);
}
await bootstrap();
