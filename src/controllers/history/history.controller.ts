import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HistoryRepository } from '../../repository/history/history.repository';
import { AuthGuard } from '../../middleware/guards.middleware';
import { DyanmicQuery } from '../../validators/query/product.query';
import { CustomRequest } from '../../types/custom-request.type';
import { HistoryService } from '../../services/history/history-service';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly repository: HistoryRepository,
    private readonly service: HistoryService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async list(
    @Query() query: DyanmicQuery,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.repository.findAll(query);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(
      req.params.id,
      req.user.data.public_id,
    );
    return res.status(result.status).json(result);
  }
}
