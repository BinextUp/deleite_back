import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import 'reflect-metadata';
import { CORS } from './utils/cors/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.setGlobalPrefix("api/v1");
  //TODO:validacion de datos y el whitelist sirve para que no se envien datos que no esten en el dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  app.use(morgan('dev'));
  await app.listen(Number(process.env.PORT_APP) || 3000);
}
bootstrap();
