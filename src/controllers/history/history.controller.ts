import { Request, Response } from 'express';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';

@Controller('history')
export class HistoryController {
  @Get()
  list(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'history::list',
    });
  }
}
