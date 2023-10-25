import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../middleware/guards.middleware';
import { DyanmicQuery } from '../../validators/query/product.query';
import { BookingRepository } from '../../repository/booking/booking.repository';
import { BookingService } from '../../services/booking/booking.service';
import { BookingField } from '../../validators/booking/booking.validator';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly repository: BookingRepository,
    private readonly service: BookingService,
  ) {}

  @Post()
  async created(@Res() res: Response, @Body() body: BookingField) {
    const result = await this.service.create(body);
    return res.status(HttpStatus.CREATED).json(result);
  }

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
  async destory(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
