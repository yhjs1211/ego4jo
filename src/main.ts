import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './API.document';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  swagger.build();
  swagger.swaggerSetUp(app);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
