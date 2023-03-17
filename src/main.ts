import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting up validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Setting up swagger
  const options = new DocumentBuilder()
    .setTitle('RS Camera API Documentation')
    .setDescription('The RS Camera API description')
    .setVersion('1.0')
    .addTag('rs-camera')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
