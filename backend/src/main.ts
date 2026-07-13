import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
} from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://bookease-puce.vercel.app',
  ],
  credentials: true,
});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // ==============================
  // Global Exception Filter
  // ==============================

  app.useGlobalFilters(
    new AllExceptionsFilter(),
  );

  // ==============================
  // Swagger Configuration
  // ==============================

  const config = new DocumentBuilder()
    .setTitle('BookEase API')
    .setDescription(
      'REST API documentation for the BookEase Home Services Platform.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  const port =
    Number(process.env.PORT) || 5000;

  await app.listen(
    port,
    '0.0.0.0',
  );

  console.log(
    `🚀 BookEase API running on port ${port}`,
  );

  console.log(
    `📚 Swagger Documentation available at /api`,
  );
}

bootstrap();