import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { joinpath } from './utils/system/system';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/assets/:filePath', (req: Request, res: Response) => {
    return res.sendFile(joinpath(`../../assets/${req.params.filePath}`));
  });
  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();
