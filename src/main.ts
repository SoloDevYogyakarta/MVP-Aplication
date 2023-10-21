import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('/api/v1/');
  await app.listen(3000).then(() => {
    console.log('Application running on http://localhost:3000');
  });
}
bootstrap();
