import { Request, Response } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HistoryRepository } from '../../repository/history/history.repository';
import { AuthGuard } from '../../middleware/guards.middleware';

@Controller('history')
export class HistoryController {
  constructor(private readonly repository: HistoryRepository) {}

  @Post(':id')
  update(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('updated');
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
