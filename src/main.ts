import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useGlobalPipes(new ValidationPipe())
  app.use(graphqlUploadExpress());
  app.use(express.json({ limit: '10mb' }));
  app.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    console.log(req.headers)
    next();
  });
  app.enableCors();
  await app.listen(process.env.PORT);
  console.error(
    '\x1b[35m',
    `Listening in the port: ${process.env.PORT} 🚀🚀🚀 `,
  );
}
bootstrap();
