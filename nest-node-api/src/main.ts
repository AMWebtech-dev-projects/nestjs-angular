import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRETKEY,
      proxy: true,
      resave: true,
      saveUninitialized: true
    })
  );
  app.enableCors({
    origin: ['http://localhost:4200'],
    // origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'photos'));

  const swaggerUi = require("swagger-ui-express");
  const swaggerJsDoc = require('../swagger.json');
  app.use("/swagger-json-api", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

  await app.listen(process.env.PORT);

  Logger.log(`🚀 🚀 🚀 🚀 🚀 Server running on PORT => ${process.env.PORT}`, 'Bootstrap');

}
bootstrap();

