import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { omit } from 'lodash';
import { PromoService } from '../../services/promo-service/promo-service';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { CustomRequest } from '../../types/custom-request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from '../../utils/upload/upload';
import { PromoRepository } from '../../repository/promo-repository/promo-repository';
import { createpath } from '../../utils/system/system';

@Controller('promo')
export class PromoController {
  private readonly logger = new Logger(PromoController.name);

  constructor(
    private readonly service: PromoService,
    private readonly repository: PromoRepository,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: uploadOptions }))
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    this.logger.log(PromoController.name);
    const result = await this.service.create(req.user.data.id, req.body, file);
    createpath('../folder-text/promo-http-entity.txt', result.create);
    return res.status(HttpStatus.CREATED).json(omit(result, ['create']));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file', { storage: uploadOptions }))
  @HttpCode(HttpStatus.OK)
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const result = await this.service.update(req.params.id, req.body, file);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.repository.findAll(
      req.query,
      (req.query as { type: string }).type,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
