import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class SwaggerDocument {
  private config;

  public build() {
    this.config = new DocumentBuilder()
      .setTitle('Cat Project')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cat')
      .build();
  }

  public swaggerSetUp(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    SwaggerModule.setup('api', app, document);
  }
}

const swagger = new SwaggerDocument();

export default swagger;
