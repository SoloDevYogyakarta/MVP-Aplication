import {
  Controller,
  Delete,
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
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { CustomRequest } from '../../types/custom-request.type';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from '../../utils/upload/upload';
import { createpath } from '../../utils/system/system';

@Controller('history')
export class ServiceHistoryController {
  private readonly logger = new Logger(ServiceHistoryController.name);

  constructor(private readonly service: HistoryService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('file', 5, { storage: uploadOptions }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    this.logger.log(ServiceHistoryController.name);
    let ids = [];
    const result = await this.service.create(
      req.params.id,
      req.body.desc,
      JSON.parse(req.body.data),
      files,
    );
    ids = [...result.ids, result.result.id];
    createpath('../folder-text/order-ids.txt', ids);
    createpath('../folder-text/visit.txt', result.findOne.id);
    return res
      .status(result.status)
      .json(omit(result, ['result', 'ids', 'findOne']));
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  @UseInterceptors(FilesInterceptor('file', 5, { storage: uploadOptions }))
  @HttpCode(HttpStatus.CREATED)
  async update(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    this.logger.log(ServiceHistoryController.name);
    const result = await this.service.update(
      req.params.id,
      req.body.desc,
      JSON.parse(req.body.data),
      files,
    );
    return res.status(result.status).json(omit(result, ['result']));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }
}
