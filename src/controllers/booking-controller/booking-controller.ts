import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { omit } from 'lodash';
import { Response } from 'express';
import { BookingField } from '../../dto/booking-dto/booking-dto';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { BookingRepository } from '../../repository/booking-repository/booking-repository';
import { BookingService } from '../../services/booking-service/booking-service';
import { CustomRequest } from '../../types/custom-request.type';
import { createpath } from '../../utils/system/system';

@Controller('booking')
export class BookingController {
  private readonly logger = new Logger(BookingController.name);

  constructor(
    private readonly service: BookingService,
    private readonly repository: BookingRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: BookingField, @Res() res: Response) {
    this.logger.log(BookingController.name);
    const result = await this.service.create(body);
    createpath('../folder-text/booking-http-entity.txt', result.create);
    return res.status(result.status).json(omit(result, ['create']));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(BookingController.name);
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(BookingController.name);
    const result = await this.repository.findAll(
      req.query,
      (req.query as { type: string }).type,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(BookingController.name);
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
