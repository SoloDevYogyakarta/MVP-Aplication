import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DyanmicQuery } from '../../validators/query/product.query';
import { AuthGuard } from '../../middleware/guards.middleware';
import { ProductRepository } from '../../repository/product/product.repository';
import { ProductService } from '../../services/product/product.service';
import { CustomRequest } from '../../types/custom-request.type';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from '../../utils/multer/multer';
import { createpath } from '../../utils/system/system';
import { omit } from 'lodash';

@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly repository: ProductRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5, { storage: diskStorage }))
  async create(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = await this.service.create(
      req.body,
      req.user.data.public_id,
      files,
    );
    createpath('../../database/dataTxt/basic-http-entity.txt', result.result);
    return res.status(result.status).json(omit(result, ['result']));
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('files', 5, { storage: diskStorage }))
  async update(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = await this.service.update(
      req.body as unknown as { [key: string]: string },
      req.params.id,
      files,
      req.user.data.public_id,
    );
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(
      req.params.id,
      req.user.data.public_id,
    );
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(@Query() query: DyanmicQuery, @Res() res: Response) {
    const result = await this.repository.findAll(query);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
