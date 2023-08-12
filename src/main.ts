import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './API.document';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.use(cookieParser());

  // global
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  swagger.build();
  swagger.swaggerSetUp(app);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
