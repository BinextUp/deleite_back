import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as session from 'express-session';
import 'reflect-metadata';
import { CORS } from './utils/cors/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.setGlobalPrefix("api/v1", { exclude:[{ path: '/', method: RequestMethod.GET }]  });
  //TODO:validacion de datos y el whitelist sirve para que no se envien datos que no esten en el dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  app.use(morgan('dev'));
  app.use(session({
    secret: String(process.env.SECRET_SESSION),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, //si lo colocas en true, debes usar https el servidor
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  }));

  //TODO: documentacion de la API en swagger
  const config = new DocumentBuilder()
    .setTitle('Documentacion de la API Deleite App')
    .setDescription('Documentacion de la API Deleite App')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      tagsSorter: 'alpha',
    },
  });
  
  await app.listen(Number(process.env.PORT_APP) || 3000);
}
bootstrap();
