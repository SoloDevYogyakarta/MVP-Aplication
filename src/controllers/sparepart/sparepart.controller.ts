import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

@Controller('sparepart')
export class SparepartController {
  @Post()
  created(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json('created');
  }

  @Post(':id')
  updated(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json('updated');
  }

  @Get()
  list(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('list');
  }

  @Get(':id')
  detail(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('detail');
  }

  @Delete(':id')
  destory(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('destory');
  }
}
