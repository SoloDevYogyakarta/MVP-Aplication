import { Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/assets/:filePath', (req: Request, res: Response) => {
    return res.sendFile(join(__dirname, `./assets/${req.params.filePath}`));
  });
  app.setGlobalPrefix('/api/v1/');
  await app.listen(3000).then(() => {
    console.log('Application running on http://localhost:3000');
  });
}
bootstrap();
