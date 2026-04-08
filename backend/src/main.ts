import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from the Next.js frontend (dev: 3000, prod: configurable)
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
