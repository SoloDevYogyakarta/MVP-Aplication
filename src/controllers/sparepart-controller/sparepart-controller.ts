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
import { Response } from 'express';
import { omit } from 'lodash';
import { CustomRequest } from '../../types/custom-request.type';
import { SparepartField } from '../../dto/sparepart-dto/sparepart-dto';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { SparepartRepository } from '../../repository/sparepart-repository/sparepart-repository';
import { SparepartService } from '../../services/sparepart-service/sparepart-service';
import { createpath } from '../../utils/system/system';

@Controller('sparepart')
export class SparepartController {
  private readonly logger = new Logger(SparepartController.name);

  constructor(
    private readonly repository: SparepartRepository,
    private readonly service: SparepartService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: SparepartField[], @Res() res: Response) {
    this.logger.log(SparepartController.name);
    const result = await this.service.create(body);
    createpath('../folder-text/sparepart-http-entity.txt', result.create);
    createpath(`../folder-text/free-text-http-entity.txt`, result.free);
    return res.status(result.status).json(omit(result, ['create', 'free']));
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() body: SparepartField[],
  ) {
    this.logger.log(SparepartController.name);
    const result = await this.service.update(req.params.id, body);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(SparepartController.name);
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Delete('free-text/:id')
  @HttpCode(HttpStatus.OK)
  async destroyFreeText(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(SparepartController.name);
    const result = await this.service.freeDestroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(SparepartController.name);
    const result = await this.repository.findALl(
      req.query,
      (req.query as { type: string }).type,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(SparepartController.name);
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
