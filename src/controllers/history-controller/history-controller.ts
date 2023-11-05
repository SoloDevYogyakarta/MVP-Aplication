import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { omit } from 'lodash';
import { HistoryService } from '../../services/history-service/history-service';
import { HistoryRepository } from '../../repository/history-repository/history-repository';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { CustomRequest } from '../../types/custom-request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from '../../utils/upload/upload';

@Controller('services/history')
export class ServiceHistoryController {
  private readonly logger = new Logger(ServiceHistoryController.name);

  constructor(
    private readonly repository: HistoryRepository,
    private readonly service: HistoryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('files', { storage: uploadOptions }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: CustomRequest,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    this.logger.log(ServiceHistoryController.name);
    const result = await this.service.create(
      req.params.id,
      JSON.parse(req.body.data),
    );
    return res.status(result.status).json(omit(result, ['result']));
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async all(@Res() res: Response) {
    this.logger.log(ServiceHistoryController.name);
    const result = await this.repository.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(ServiceHistoryController.name);
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }
}
