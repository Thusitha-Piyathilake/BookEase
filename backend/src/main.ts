import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 5000, '127.0.0.1');

  console.log(
    `🚀 BookEase API running at http://127.0.0.1:${process.env.PORT ?? 5000}`,
  );
}

bootstrap();