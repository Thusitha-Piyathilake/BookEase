import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 5000;

  await app.listen(port, '127.0.0.1');

  console.log(`🚀 BookEase API running at http://127.0.0.1:${port}`);
}

bootstrap();